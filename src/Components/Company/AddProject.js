import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProject, getCurrentCompanyProfile, getProfileCreated, deleteProject } from '../../Actions/companyProfileActions';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import isEmpty from "../../validation/is-empty"
import Loader from "../Loader/Loader"

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

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

      componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.getProfileCreated();
          this.props.getCurrentCompanyProfile();
          if (!isEmpty(this.props.profilecreated)) {
            if (!this.props.profilecreated.profilecreated) {
              if (this.props.auth.user.userType === "student") {
                this.props.history.push("/createprofile")
              } else this.props.history.push("/createcompanyprofile")
            }
          }
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


      getDate = date => {
        date = new Date(date);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      };
    
      delete = id => {
        this.props.deleteProject(id, this.props.getCurrentCompanyProfile)
      }

    render(){
        const { classes } = this.props;
        const { errors } = this.state;
        if (isEmpty(this.props.profilecreated) || isEmpty(this.props.profile)) { return <Loader /> }
    else {
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
              <br />
            {!isEmpty(this.props.profile.project) && <Typography variant="display1" className={classes.title}>
              Manage
            </Typography>}
            <br />

            {this.props.profile.project.map(pro => (
              <div className="card" key={pro._id} style={{ marginBottom: 20 }}>
                <div className="card-header">{pro.title}</div>
                <div className="card-body">
                  <h5 className="card-title">{pro.client} - {pro.clientlocation}</h5>
                  <p className="card-text">
                    {this.getDate(pro.from)} -{" "}
                    {pro.current ? "PRESENT" : this.getDate(pro.to)}
                  </p>
                  <p>
                    {pro.description}
                  </p>
                  <ul>
                    {pro.skills.map((skill, index) =>
                      <li key={index}>
                        {skill}
                      </li>)}
                  </ul>
                  <a
                    href="#"
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      this.delete(pro._id)
                    }}
                  >
                    Delete
                  </a>
                </div>
              </div>
            ))}
              <br/>
            </div>
            </div>
        )
    }
    }
}
  
  const mapStateToProps = state => ({
    profile: state.profile.profile,
    errors: state.errors,
    auth: state.auth,
    profilecreated: state.profilecreated.profilecreated,
    deleteprojectcompany: state.profile.deleteprojectcompany
  });

// export default connect(mapStateToProps, { addProject, getCurrentCompanyProfile })(
//     withRouter(withStyles(styles)(AddProject))
//   );

  export default compose(
    withStyles(styles),
    connect(mapStateToProps, { addProject, getCurrentCompanyProfile, getProfileCreated, deleteProject })
  )(withRouter(AddProject))
  