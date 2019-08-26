import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { addActivities, getProfileCreated } from "../Actions/profileActions";
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
    { addActivities, getProfileCreated }
  )
)(withRouter(AddExtracurricularActivities));
