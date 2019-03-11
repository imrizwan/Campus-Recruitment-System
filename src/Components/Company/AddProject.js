import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProject, getCurrentCompanyProfile } from '../../Actions/companyProfileActions';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


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

class AddProject extends Component {

    state = {
        title: '',
        client: '',
        clientlocation: '',
        from: '',
        to: '',
        current: false,
        description: '',
        skills: "",
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
        const proData = {
          title: this.state.title,
          client: this.state.client,
          clientlocation: this.state.clientlocation,
          from: this.state.from,
          to: this.state.to,
          current: this.state.current,
          description: this.state.description,
          skills: this.state.skills,
        }
        if(this.state.current && this.state.to) {
            proData.to = "";
        }
        this.props.addProject(proData, this.props.history);
      }

    render(){
        const { classes } = this.props;
        const { errors } = this.state;
        return(
            <div className={classes.root}>
            <br/>
            <Typography variant="display2" className={classes.title}>Add Project</Typography>
            <br/>
            <div className={classes.center}>
            <TextField
              id="title"
              label="TItle Name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('title')}
              />
              <br/>
              {
              errors.title ? <div style={{ color: "red" }}>{ errors.title }</div> : null
              }
              <br/>
            <TextField
              id="client"
              label="Client Name/Company"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('client')}
              />
              <br/>
              {
              errors.client ? <div style={{ color: "red" }}>{ errors.client }</div> : null
              }
              <br/>
            <TextField
              id="clientlocation"
              label="Client Location"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeInput('clientlocation')}
              />
              <br/>
              {
              errors.clientlocation ? <div style={{ color: "red" }}>{ errors.clientlocation }</div> : null
              }
              <br/>
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
              errors.from ? <div style={{ color: "red" }}>{ errors.from }</div> : null
              }
              <br/>
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
              <br/>
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
                    id="outlined-skills"
                    label="Skills"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.handle}
                    onChange={this.handleChangeInput('skills')}
                    placeholder="Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP"
                    multiline
                    />
                    {
                        errors.skills ? <div style={{ color: "red" }}>{ errors.skills }</div> : null
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

AddProject.propTypes = {
    addProject: PropTypes.func.isRequired,
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

// export default connect(mapStateToProps, { addProject, getCurrentCompanyProfile })(
//     withRouter(withStyles(styles)(AddProject))
//   );

  export default compose(
    withStyles(styles),
    connect(mapStateToProps, { addProject, getCurrentCompanyProfile })
  )(withRouter(AddProject))
  