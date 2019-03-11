import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addVaccancy, getCurrentCompanyProfile } from '../../Actions/companyProfileActions';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';


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


  // Select options for status
  const jobtype = [
    { label: '* Select Job Type', value: 0 },
    { label: 'Full Time', value: 'Full Time' },
    { label: 'Part Time', value: 'Part Time' },
    { label: 'Contract', value: 'Contract' },
    { label: 'Intern', value: 'Intern' }
  ]

class AddVaccancy extends Component {

    state = {
        position: "",
        degreerequired: "",
        skillsrequired: "",
        jobtype: "",
        description: "",
        contactno: "",
        errors: {},
        disabled: false
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

    //   componentWillMount() {
    //     var profilecreatedVar = JSON.parse(localStorage.getItem('profilecreated'));
    //     if (this.props.auth.isAuthenticated) {
    //         if(!profilecreatedVar){
    //             this.props.history.push('/createcompanyprofile');
    //         }
    //     }
    // }

    //   handleChangeCheckbox = name => event => {
    //     let disabled = !this.state.disabled;
    //     this.setState({ [name]: event.target.checked, disabled });
    //   };

    handleChangeInput = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

      onClick = (e) => {
        e.preventDefault();
        const vaccancyData = {
          position: this.state.position,
          degreerequired: this.state.degreerequired,
          skillsrequired: this.state.skillsrequired,
          jobtype: this.state.jobtype,
          description: this.state.description,
          contactno: this.state.contactno
        }

        console.log(vaccancyData);
        this.props.addVaccancy(vaccancyData, this.props.history);
      }

    render(){
        const { classes } = this.props;
        const { errors } = this.state;
        return(
            <div className={classes.root}>
            <br/>
            <Typography variant="display2" className={classes.title}>Add Vaccancy</Typography>
            <br/>
            <div className={classes.center}>
            <TextField
              id="position"
              label="Position / Designation"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('position')}
              />
              <br/>
              {
              errors.position ? <div style={{ color: "red" }}>{ errors.position }</div> : null
              }
              <br/>
            <TextField
              id="degreerequired"
              label="Qualification"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('degreerequired')}
              />
              <br/>
              {
              errors.degreerequired ? <div style={{ color: "red" }}>{ errors.degreerequired }</div> : null
              }
              <br/>
            <TextField
              id="skillsrequired"
              label="Required Skills"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('skillsrequired')}
              />
              <br/>
              {
              errors.skillsrequired ? <div style={{ color: "red" }}>{ errors.skillsrequired }</div> : null
              }
              <br/>
              <br/>
            <TextField
              id="description"
              label="Project Details"
              multiline
              rowsMax="10"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('description')}
              />
              <br/>
              {
              errors.description ? <div style={{ color: "red" }}>{ errors.description }</div> : null
              }
              <br/>
              <TextField
                    id="select-jobtype"
                    select
                    label="Select Job Type"
                    className={classes.textField}
                    value={this.state.jobtype}
                    onChange={this.handleChangeInput('jobtype')}
                    SelectProps={{
                        MenuProps: {
                        className: classes.menu,
                        },
                    }}
                    helperText="Please select the estimated number of employees in your company"
                    margin="normal"
                    >
                    {jobtype.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                    {
                        errors.jobtype ? <div style={{ color: "red" }}>{ errors.jobtype }</div> : null
                    }
                     <TextField
                    id="contactno"
                    label="Contact No."
                    multiline
                    rowsMax="10"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChangeInput('contactno')}
                    />
                    <br/>
                    {
                    errors.contactno ? <div style={{ color: "red" }}>{ errors.contactno }</div> : null
                    }
                <br/>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.onClick}>
                Add Project
                </Button>
              <br/>
              <br/>
            </div>
            </div>
        )
    }
}

AddVaccancy.propTypes = {
    addVaccancy: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getCurrentCompanyProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
    auth: state.auth
  });

// export default connect(mapStateToProps, { addVaccancy, getCurrentCompanyProfile })(
//     withRouter(withStyles(styles)(AddVaccancy))
//   );

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { addVaccancy, getCurrentCompanyProfile })
)(withRouter(AddVaccancy))
  