import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { addActivities, getProfileCreated, getCurrentProfile, deleteActivities } from "../Actions/profileActions";
import Button from "@material-ui/core/Button";
import compose from "recompose/compose";
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
  button: {
    width: "100%"
  },
  center: {
    margin: "0 auto",
    width: "60%"
  }
});

class AddExtracurricularActivities extends Component {
  state = {
    title: "",
    desc: "",
    errors: {}
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
    const activities = {
      title: this.state.title,
      description: this.state.desc,
    };
    this.props.addActivities(activities, this.props.history);
  };

  
  delete = id => {
    this.props.deleteActivities(id, this.props.getCurrentProfile)
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
          <Typography variant="h3" style={{ textAlign: "center" }}>
            Add Extracurricular Activities
          </Typography>
          <br />
          <div className={classes.center}>
            <TextField
              id="title"
              label="Title"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput("title")}
            />
            <br />
            {errors.title ? (
              <div style={{ color: "red" }}>{errors.title}</div>
            ) : null}
            <br />
            <TextField
              id="desc"
              label="Description"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput("desc")}
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.onClick}
            >
              Add Activities
            </Button>
            <br />
            <br />
            {!isEmpty(this.props.profile.activities) && <Typography variant="h6" style={{ textAlign: "center" }}>
              Manage
            </Typography>}
            <br />

            {this.props.profile.activities.map(act => (
              <div className="card" key={act._id} style={{ marginBottom: 20 }}>
                <div className="card-header">{act.title}</div>
                <div className="card-body">
                  <p className="card-text">
                    {act.description}
                  </p>
                  <a
                    href={null}
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      this.delete(act._id)
                    }}
                  >
                    Delete
                  </a>
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
  auth: state.auth,
  profilecreated: state.profilecreated.profilecreated,
  profile: state.profile.profile,
  deleteactivities: state.profile.deleteactivities
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { addActivities, getProfileCreated, getCurrentProfile, deleteActivities }
  )
)(withRouter(AddExtracurricularActivities));
