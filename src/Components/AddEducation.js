import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import {
  addEducation,
  getCurrentProfile,
  getProfileCreated,
  deleteEducation
} from "../Actions/profileActions";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    from: "",
    to: "",
    current: false,
    errors: {},
    disabled: false
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

  handleChangeCheckbox = name => event => {
    let disabled = !this.state.disabled;
    this.setState({ [name]: event.target.checked, disabled });
  };

  handleChangeInput = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onClick = e => {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current
    };
    if (this.state.current && this.state.to) {
      eduData.to = "";
    }
    this.props.addEducation(eduData, this.props.history);
  };

  getDate = date => {
    date = new Date(date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  delete = id => {
    this.props.deleteEducation(id, this.props.getCurrentProfile)
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
            Add Education
          </Typography>
          <br />
          <div className={classes.center}>
            <TextField
              id="school"
              label="Institute Name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput("school")}
            />
            <br />
            {errors.school ? (
              <div style={{ color: "red" }}>{errors.school}</div>
            ) : null}
            <br />
            <TextField
              id="degree"
              label="Degree or Certification"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput("degree")}
            />
            <br />
            {errors.degree ? (
              <div style={{ color: "red" }}>{errors.degree}</div>
            ) : null}
            <br />
            <TextField
              id="fromdate"
              label="From Date"
              type="date"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.handleChangeInput("from")}
            />
            {errors.from ? (
              <div style={{ color: "red" }}>{errors.from}</div>
            ) : null}
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.current}
                  onChange={this.handleChangeCheckbox("current")}
                  value="checkedB"
                  color="primary"
                />
              }
              label="Currently Studying"
            />
            <br />
            <TextField
              id="todate"
              label="To Date"
              type="date"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              disabled={this.state.disabled}
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.handleChangeInput("to")}
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.onClick}
            >
              Add Education
            </Button>
            <br />
            <br />
            {!isEmpty(this.props.profile.education) && <Typography variant="display1" className={classes.title}>
              Manage
            </Typography>}
            <br />

            {this.props.profile.education.map(edu => (
              <div className="card" key={edu._id} style={{ marginBottom: 20 }}>
                <div className="card-header">{edu.degree}</div>
                <div className="card-body">
                  <h5 className="card-title">{edu.school}</h5>
                  <p className="card-text">
                    {this.getDate(edu.from)} -{" "}
                    {edu.current ? "PRESENT" : this.getDate(edu.to)}
                  </p>
                  <a
                    href={null}
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      this.delete(edu._id)
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
  profile: state.profile.profile,
  errors: state.errors,
  auth: state.auth,
  profilecreated: state.profilecreated.profilecreated,
  deleteeducation: state.profile.deleteeducation
});

// export default connect(mapStateToProps, { addEducation, getCurrentProfile })(
//     withRouter(withStyles(styles)(AddEducation))
//   );

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { addEducation, getCurrentProfile, getProfileCreated, deleteEducation }
  )
)(withRouter(AddEducation));
