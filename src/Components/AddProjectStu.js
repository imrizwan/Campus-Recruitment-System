import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { addLanguage, getProfileCreated } from "../Actions/profileActions";
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

class AddProjectStu extends Component {
  state = {
    name: "",
    level: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getProfileCreated();
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

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    if (isEmpty(this.props.profilecreated)) {
      return <Loader />;
    } else {
      return (
        <div className={classes.root}>
          <br />
          <Typography variant="display2" className={classes.title}>
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
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  profilecreated: state.profilecreated.profilecreated
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { addLanguage, getProfileCreated }
  )
)(withRouter(AddProjectStu));
