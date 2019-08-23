import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation, getCurrentProfile, getProfileCreated } from '../Actions/profileActions';
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

class AddEducation extends Component {

  state = {
    school: '',
    degree: '',
    fieldofstudy: '',
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
      if (!isEmpty(this.props.profilecreated)) {
        if (!this.props.profilecreated.profilecreated) {
          if (this.props.auth.user.userType === "student") {
            this.props.history.push("/createprofile")
          } else this.props.history.push("/createcompanyprofile")
        }
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  //   componentWillMount() {
  //     var profilecreatedVar = JSON.parse(localStorage.getItem('profilecreated'));
  //     if (this.props.auth.isAuthenticated) {
  //         if(!profilecreatedVar){
  //             this.props.history.push('/createprofile');
  //         }
  //     }
  // }

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
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    }
    if (this.state.current && this.state.to) {
      eduData.to = "";
    }
    this.props.addEducation(eduData, this.props.history);
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    if (isEmpty(this.props.profilecreated)) { return <Loader /> }
    else {
      return (
        <div className={classes.root}>
          <br />
          <Typography variant="display2" className={classes.title}>Add Education</Typography>
          <br />
          <div className={classes.center}>
            <TextField
              id="school"
              label="School Name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('school')}
            />
            <br />
            {
              errors.school ? <div style={{ color: "red" }}>{errors.school}</div> : null
            }
            <br />
            <TextField
              id="degree"
              label="Degree or Certification"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('degree')}
            />
            <br />
            {
              errors.degree ? <div style={{ color: "red" }}>{errors.degree}</div> : null
            }
            <br />
            <TextField
              id="field"
              label="Field of Study"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('fieldofstudy')}
            />
            <br />
            {
              errors.fieldofstudy ? <div style={{ color: "red" }}>{errors.fieldofstudy}</div> : null
            }
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
              label="Program Description"
              multiline
              rowsMax="10"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('description')}
            />
            <br />
            <Button variant="contained" color="primary" className={classes.button} onClick={this.onClick}>
              Add Education
              </Button>
            <br />
            <br />
          </div>
        </div>
      )
    }
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
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

// export default connect(mapStateToProps, { addEducation, getCurrentProfile })(
//     withRouter(withStyles(styles)(AddEducation))
//   );

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { addEducation, getCurrentProfile, getProfileCreated })
)(withRouter(AddEducation))
