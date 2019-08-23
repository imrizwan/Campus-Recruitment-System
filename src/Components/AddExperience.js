import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience, getCurrentProfile, getProfileCreated } from '../Actions/profileActions';
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
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false
  };

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
      description: this.state.description
    };
    if (this.state.current && this.state.to) {
      expData.to = "";
    }
    console.log(expData);
    this.props.addExperience(expData, this.props.history);
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    if (isEmpty(this.props.profilecreated)) { return <Loader /> }
    else {
      return (
        <div className={classes.root}>
          <br />
          <Typography variant="display2" className={classes.title}>Add Experience</Typography>
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
          </div>
        </div>
      )
    }
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth,
  profilecreated: state.profilecreated.profilecreated,
});

// export default connect(mapStateToProps, { addExperience, getCurrentProfile })(
//     withRouter(withStyles(styles)(AddExperience))
//   );

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { addExperience, getCurrentProfile, getProfileCreated })
)(withRouter(AddExperience))
