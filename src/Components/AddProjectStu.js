import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { getProfileCreated, addProjectsStu, getCurrentProfile, deleteProject } from "../Actions/profileActions";
import Button from "@material-ui/core/Button";
import compose from "recompose/compose";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import isEmpty from "../validation/is-empty";
import Loader from "./Loader/Loader";
const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  textField: {
    width: "100%"
  },
  textFieldNew: {
    width: 200
  },
  button: {
    width: "100%"
  },
  center: {
    margin: "0 auto",
    width: "60%"
  }
});

class AddProjectStu extends Component {
  state = {
    name: "",
    url: "",
    title: "",
    desc: "",
    errors: {},
    list: []
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getProfileCreated();
      this.props.getCurrentProfile();
      if (!isEmpty(this.props.profilecreated)) {
        if (!this.props.profilecreated.profilecreated) {
          if (this.props.auth.user.userType === "student") {
            this.props.history.push("/createprofile");
          } else this.props.history.push("/createcompanyprofile");
        }
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChangeInput = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onClick = e => {
    e.preventDefault();

    if (!this.state.name || this.state.list === []) {
      alert("Enter complete details");
    } else {
      const langData = {
        name: this.state.name,
        list: this.state.list
      };
      this.props.addProjectsStu(langData, this.props.history);
    }
  };

  addProject = () => {
    if (!this.state.title || !this.state.desc) {
      alert("Enter complete details");
    } else {
      const list = this.state.list;

      list.push({
        url: this.state.url,
        title: this.state.title,
        description: this.state.desc
      });

      this.setState({ list });
    }
  };

  removeFromList = (index) => {
    const list = this.state.list;

    if (list) {
      if (index > -1) {
        list.splice(index, 1);
      }
      this.setState({ list })
    }
  };

  delete = id => {
    this.props.deleteProject(id, this.props.getCurrentProfile)
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    if (isEmpty(this.props.profilecreated) || isEmpty(this.props.profile)) {
      return <Loader />;
    } else {
      return (
        <div className={classes.root}>
          <br />
          <Typography variant="h3" style={{ textAlign: "center" }} className={classes.title}>
            Add Project
          </Typography>
          <br />
          <div className={classes.center}>
            <TextField
              id="name"
              label="Company Name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput("name")}
            />
            {errors.name ? (
              <div style={{ color: "red" }}>{errors.name}</div>
            ) : null}
            <TextField
              id="url"
              label="Project URL"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput("url")}
            />
            <br />
            {errors.url ? (
              <div style={{ color: "red" }}>{errors.url}</div>
            ) : null}
            <TextField
              id="title"
              label="Project Title"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput("title")}
            />
            <br />
            <TextField
              id="desc"
              label="Project Description"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput("desc")}
            />
            <br />
            {errors.list ? (
              <div style={{ color: "red" }}>{errors.list}</div>
            ) : null}
            <br />
            <div className="text-center" onClick={this.addProject}>
              <AddCircleOutlineIcon style={{ width: 60, height: 60 }} />
            </div>
            <br />
            {this.state.list ? (
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Remove</th>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.list
                    ? this.state.list.map((l, index) => (
                        <tr key={index}>
                          <th scope="row" style={{ color: "red" }}>
                            <div onClick={() => this.removeFromList(index)}>X</div>
                          </th>
                          <th>{index + 1}</th>
                          <td>
                            <a href={`//${l.url}`}>{l.title}</a>
                          </td>
                          <td>{l.description}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            ) : null}
            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.onClick}
            >
              Add Projects
            </Button>
            <br />
            <br />
            {!isEmpty(this.props.profile.projects) && <Typography variant="h6" style={{ textAlign: "center" }}>
              Manage
            </Typography>}
            <br />

            {this.props.profile.projects.map(proj => (
              <div className="card" key={proj._id} style={{ marginBottom: 20 }}>
                <div className="card-header">{`Projects of ${proj.name}`}</div>
                <div className="card-body">
                  <button
                    // href={null}
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      this.delete(proj._id)
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <br />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile.profile,
  auth: state.auth,
  profilecreated: state.profilecreated.profilecreated,
  deleteproject: state.profile.deleteproject
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getProfileCreated, addProjectsStu, deleteProject, getCurrentProfile }
  )
)(withRouter(AddProjectStu));
