import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { createProfile, getProfileCreated } from "../Actions/profileActions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import compose from "recompose/compose";
import isEmpty from "../validation/is-empty";
import Loader from "./Loader/Loader";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  textField: {
    width: "100%"
  },
  center: {
    margin: "0 auto",
    width: "50%"
  },
  menu: {
    width: 200
  }
});

// Select batch
const batch = [
  { value: "Spring 2014" },
  { value: "Fall 2014" },
  { value: "Spring 2015" },
  { value: "Fall 2015" },
  { value: "Spring 2016" },
  { value: "Fall 2016" },
  { value: "Spring 2017" },
  { value: "Fall 2017" },
  { value: "Spring 2018" },
  { value: "Fall 2018" },
  { value: "Spring 2019" },
  { value: "Fall 2019" }
];

class CreateProfile extends React.Component {
  state = {
    name: "",
    mail: "",
    phoneNumber: "",
    website: "",
    description: "",
    batch: "",
    location: "",
    skills: "",
    interests: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    github: "",
    instagram: "",
    errors: {},
    displaySocialInputs: false
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getProfileCreated(this.props.history, this.props.match.url);
    }

    if (this.props.auth.isAuthenticated) {
      this.props.getProfileCreated();
      if (!isEmpty(this.props.profilecreated)) {
        if (this.props.profilecreated.profilecreated) {
          if (this.props.auth.user.userType === "student") {
            this.props.history.push("/updateprofile");
          } else this.props.history.push("/updatecompanyprofile");
        } else if (!this.props.profilecreated.profilecreated) {
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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onClick = e => {
    e.preventDefault();
    const profileData = {
      username: this.props.auth.user.username,
      name: this.state.name,
      mail: this.props.auth.user.email,
      phoneNumber: this.state.phoneNumber,
      website: this.state.website,
      description: this.state.description,
      batch: this.state.batch,
      location: this.state.location,
      skills: this.state.skills,
      interests: this.state.interests,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      github: this.state.github,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { classes } = this.props;
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <TextField
            id="outlined-twitter-username"
            label="Twitter Profile Username"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={this.state.twitter}
            onChange={this.handleChange("twitter")}
          />
          {errors.twitter ? (
            <div style={{ color: "red" }}>{errors.twitter}</div>
          ) : null}
          <TextField
            id="outlined-facebook-username"
            label="Facebook Page Username"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={this.state.facebook}
            onChange={this.handleChange("facebook")}
          />
          {errors.facebook ? (
            <div style={{ color: "red" }}>{errors.facebook}</div>
          ) : null}
          <TextField
            id="outlined-linkedin-username"
            label="Linkedin Profile Username"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={this.state.linkedin}
            onChange={this.handleChange("linkedin")}
          />
          {errors.linkedin ? (
            <div style={{ color: "red" }}>{errors.linkedin}</div>
          ) : null}
          <TextField
            id="outlined-youtube-username"
            label="YouTube Profile Username"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={this.state.youtube}
            onChange={this.handleChange("youtube")}
          />
          {errors.youtube ? (
            <div style={{ color: "red" }}>{errors.youtube}</div>
          ) : null}
          <TextField
            id="outlined-instagram-username"
            label="Instagram Profile Username"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={this.state.instagram}
            onChange={this.handleChange("instagram")}
          />
          {errors.instagram ? (
            <div style={{ color: "red" }}>{errors.instagram}</div>
          ) : null}

          <TextField
            id="outlined-github-username"
            label="Github Profile Username"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={this.state.github}
            onChange={this.handleChange("github")}
          />
          {errors.github ? (
            <div style={{ color: "red" }}>{errors.github}</div>
          ) : null}
        </div>
      );
    }
    if (isEmpty(this.props.profilecreated)) {
      return <Loader />;
    } else {
      return !isEmpty(this.props.profilecreated) &&
        this.props.profilecreated.profilecreated ? (
        <div>
          <br />
          <Typography variant="display1" className={classes.title}>
            You have already made profile, Go to{" "}
            <Link to="/updateprofile">Update Profile</Link> for Changes
          </Typography>
        </div>
      ) : (
        <div>
          <div className={classes.root}>
            <br />
            <div className={classes.center}>
              {!isEmpty(this.props.profilecreated) &&
              this.props.profilecreated.profilecreated ? (
                <Typography variant="display2">Create Profile</Typography>
              ) : null}
              {!isEmpty(this.props.profilecreated) &&
              !this.props.profilecreated.profilecreated ? (
                <Typography variant="display1">
                  Create your profile first
                </Typography>
              ) : null}
              <TextField
                id="outlined-username"
                label="Username"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.props.auth.user.username}
                onChange={this.handleChange("username")}
                placeholder="A unique username for your profile URL. Your full name, company name, nickname"
                disabled
              />
              <TextField
                id="outlined-name"
                label="Name"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.name}
                onChange={this.handleChange("name")}
                placeholder="Enter your fullname"
              />
              {errors.name ? (
                <div style={{ color: "red" }}>{errors.name}</div>
              ) : null}
              <TextField
                id="outlined-mail"
                label="Email"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.props.auth.user.email}
                onChange={this.handleChange("mail")}
                placeholder="Enter your Mail"
                disabled
              />
              {errors.mail ? (
                <div style={{ color: "red" }}>{errors.mail}</div>
              ) : null}
              <TextField
                id="outlined-phoneNumber"
                label="Phone Number"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.phoneNumber}
                onChange={this.handleChange("phoneNumber")}
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber ? (
                <div style={{ color: "red" }}>{errors.phoneNumber}</div>
              ) : null}
              <TextField
                id="outlined-description"
                label="Bio"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.description}
                onChange={this.handleChange("description")}
                placeholder="Tell us a little about yourself"
                multiline
              />
              {errors.description ? (
                <div style={{ color: "red" }}>{errors.description}</div>
              ) : null}
              <TextField
                id="select-batch"
                select
                label="Select"
                className={classes.textField}
                value={this.state.batch}
                onChange={this.handleChange("batch")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText="Please select your batch"
                margin="normal"
              >
                {batch.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              {errors.batch ? (
                <div style={{ color: "red" }}>{errors.batch}</div>
              ) : null}
              <TextField
                id="outlined-website"
                label="Website"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.handle}
                onChange={this.handleChange("website")}
                placeholder="You website link"
                multiline
              />
              {errors.website ? (
                <div style={{ color: "red" }}>{errors.website}</div>
              ) : null}
              <TextField
                id="outlined-location"
                label="Location"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.handle}
                onChange={this.handleChange("location")}
                placeholder="City or city &amp; state suggested (eg. Karachi, Sindh)"
                multiline
              />
              {errors.location ? (
                <div style={{ color: "red" }}>{errors.location}</div>
              ) : null}
              <TextField
                id="outlined-skills"
                label="Skills"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.handle}
                onChange={this.handleChange("skills")}
                placeholder="Please use comma separated values (eg.
                            HTML,CSS,JavaScript,PHP"
                multiline
              />
              {errors.skills ? (
                <div style={{ color: "red" }}>{errors.skills}</div>
              ) : null}

              <TextField
                id="outlined-interests"
                label="Interests"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.handle}
                onChange={this.handleChange("interests")}
                placeholder="Please use comma separated values (eg.
                            Coding,Exercising, Singing"
                multiline
              />
              {errors.interests ? (
                <div style={{ color: "red" }}>{errors.interests}</div>
              ) : null}

              <br />
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => {
                  this.setState(prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                  }));
                }}
              >
                Add Social Network Links
              </Button>
              <span>Optional</span>
              {socialInputs}
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.onClick}
              >
                Submit
              </Button>
              <br />
              <br />
            </div>
          </div>
        </div>
      );
    }
  }
}

CreateProfile.propTypes = {
  getProfileCreated: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  profilecreated: state.profilecreated.profilecreated
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { createProfile, getProfileCreated }
  )
)(withRouter(CreateProfile));
