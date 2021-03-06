import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { addLanguage, getProfileCreated, deleteLanguage, getCurrentProfile } from "../Actions/profileActions";
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

class AddLanguage extends Component {
  state = {
    name: "",
    level: "",
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
    const langData = {
      name: this.state.name,
      level: this.state.level,
    };
    this.props.addLanguage(langData, this.props.history);
  };

  delete = id => {
    this.props.deleteLanguage(id, this.props.getCurrentProfile)
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
            Add Languages
          </Typography>
          <br />
          <div className={classes.center}>
            <TextField
              id="name"
              label="Language Name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput("name")}
            />
            <br />
            {errors.name ? (
              <div style={{ color: "red" }}>{errors.name}</div>
            ) : null}
            <br />
            <TextField
              id="select-level"
              select
              label="Select Language Level"
              className={classes.textField}
              value={this.state.level}
              onChange={this.handleChangeInput("level")}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
            >
              {[
                {
                  value: "Basic"
                },
                {
                  value: "Conversational"
                },
                {
                  value: "Fluent"
                },
                {
                  value: "Native/Bilingual"
                }
              ].map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            {errors.level ? (
              <div style={{ color: "red" }}>{errors.level}</div>
            ) : null}
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.onClick}
            >
              Add Language
            </Button>
            <br />
            <br />
            {!isEmpty(this.props.profile.language) && <Typography variant="h6" style={{ textAlign: "center" }}>
              Manage
            </Typography>}
            <br />

            {this.props.profile.language.map(lang => (
              <div className="card" key={lang._id} style={{ marginBottom: 20 }}>
                <div className="card-header">{lang.name} - {lang.level}</div>
                <div className="card-body">
                  <button
                    // href={null}
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      this.delete(lang._id)
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
  auth: state.auth,
  profile: state.profile.profile,
  profilecreated: state.profilecreated.profilecreated,
  deletelanguage: state.profile.deletelanguage
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { addLanguage, getProfileCreated, deleteLanguage, getCurrentProfile }
  )
)(withRouter(AddLanguage));
