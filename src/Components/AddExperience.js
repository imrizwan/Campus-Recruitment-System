import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { addExperience, getCurrentProfile, getProfileCreated, deleteExperience } from '../Actions/profileActions';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import compose from 'recompose/compose'
import isEmpty from "../validation/is-empty"
import Loader from "./Loader/Loader"

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  textField: {
    width: "100%",
  },
  button: {
    width: "100%"
  },
  center: {
    margin: "0 auto",
    width: "60%"
  }
});

class AddExperience extends Component {

  state = {
    company: '',
    title: '',
    location: '',
    companyLink: '',
    companyShortDetail: '',
    from: '',
    to: '',
    current: false,
    description: '',
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
      [name]: event.target.value,
    });
  };

  onClick = (e) => {
    e.preventDefault();
    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
      companyLink: this.state.companyLink,
      companyShortDetail: this.state.companyShortDetail
    };
    if (this.state.current && this.state.to) {
      expData.to = "";
    }
    this.props.addExperience(expData, this.props.history);
  }

  getDate = date => {
    date = new Date(date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  delete = id => {
    this.props.deleteExperience(id, this.props.getCurrentProfile)
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    if (isEmpty(this.props.profilecreated) || isEmpty(this.props.profile)) { return <Loader /> }
    else {
      return (
        <div className={classes.root}>
          <br />
          <Typography variant="h3" style={{ textAlign: "center" }} className={classes.title}>Add Experience</Typography>
          <br />
          <div className={classes.center}>
            <TextField
              id="company"
              label="Company Name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('company')}
            />
            <br />
            {
              errors.company ? <div style={{ color: "red" }}>{errors.company}</div> : null
            }
            <br />
            <TextField
              id="title"
              label="Job Title"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('title')}
            />
            <br />
            {
              errors.title ? <div style={{ color: "red" }}>{errors.title}</div> : null
            }
            <br />
            <TextField
              id="location"
              label="Location"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('location')}
            />
            <br />
            <TextField
              id="companyLink"
              label="Website Link"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('companyLink')}
            />
            <br />
            <TextField
              id="companyShortDetail"
              label="Company Short Detail"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('companyShortDetail')}
            />
            <br />
            <br />
            <TextField
              id="fromdate"
              label="From Date"
              type="date"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChangeInput('from')}
            />
            {
              errors.from ? <div style={{ color: "red" }}>{errors.from}</div> : null
            }
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.current}
                  onChange={this.handleChangeCheckbox('current')}
                  value="checkedB"
                  color="primary"
                />
              }
              label="Currently Working"
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
                shrink: true,
              }}
              onChange={this.handleChangeInput('to')}
            />
            <br />
            <br />
            <TextField
              id="description"
              label="Job Description"
              multiline
              rowsMax="10"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('description')}
            />
            <br />
            <Button variant="contained" color="primary" className={classes.button} onClick={this.onClick}>
              Add Experience
              </Button>
            <br />
            <br />
            {!isEmpty(this.props.profile.experience) && <Typography variant="display1" className={classes.title}>
              Manage
            </Typography>}
            <br />

            {this.props.profile.experience.map(exp => (
              <div className="card" key={exp._id} style={{ marginBottom: 20 }}>
                <div className="card-header">{exp.title}</div>
                <div className="card-body">
                  <h5 className="card-title">{exp.company}</h5>
                  <p className="card-text">
                    {this.getDate(exp.from)} -{" "}
                    {exp.current ? "PRESENT" : this.getDate(exp.to)}
                  </p>
                  <a
                    href={null}
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      this.delete(exp._id)
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
      )
    }
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  deleteexperience: state.profile.deleteexperience,
  errors: state.errors,
  auth: state.auth,
  profilecreated: state.profilecreated.profilecreated,
});

// export default connect(mapStateToProps, { addExperience, getCurrentProfile })(
//     withRouter(withStyles(styles)(AddExperience))
//   );

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { addExperience, getCurrentProfile, getProfileCreated, deleteExperience })
)(withRouter(AddExperience))
