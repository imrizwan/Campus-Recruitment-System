import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { URL } from '../Variables';
import { Link } from "react-router-dom";
import "./index.css";

//Tabs

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//TextField
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./index.css";


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

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
    width: "40%"
  }
});

class RenderForm extends React.Component {


    state = {
      emailStudent: "",
      passwordStudent: "",
      emailCompany: "",
      passwordCompany: "",
      nameStudent: "",
      nameCompany: "",
      passwordStudent2: "",
      passwordCompany2: "",
      user: {},
      errors: {},
      success: ""
    }

    onClick = (value) => {
      //e.preventDefault();

      const { nameStudent, nameCompany,emailCompany, passwordCompany, emailStudent, passwordStudent, passwordStudent2, passwordCompany2 } = this.state;

      // var formData = new FormData();
      if(value === "student"){

        fetch(URL+"register", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
            },
          body: JSON.stringify({
            name: nameStudent,
            email: emailStudent,
            password: passwordStudent, 
            password2: passwordStudent2,
            userType: value
          })  
        })     
        .then(res => {  
          if(res.status === 400){
            res.json().then(errors => this.setState({ errors, success: "" }))
          } else if(res.status === 200) {
            res.json().then(user => this.setState({ 
              user, 
              success: "Successfully Signed Up", 
              errors: {},  
              nameStudent: "",
              emailStudent: "",
              passwordStudent: "", 
              passwordStudent2: "",
              userType: ""
            }))
          }
        })
          
      } else if (value === "company"){

        fetch(URL+"register", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
            },
          body: JSON.stringify({
            name: nameCompany,
            email: emailCompany,
            password: passwordCompany, 
            password2: passwordCompany2,
            userType: value
          })  
        })     
        .then(res => {  
          if(res.status === 400){
            res.json().then(errors => this.setState({ errors, success: "" }))
          } else if(res.status === 200) {
            res.json().then(user => this.setState({ 
              user, 
              success: "Successfully Signed Up", 
              errors: {},
              nameCompany: "",
              emailCompany: "",
              passwordCompany: "", 
              passwordCompany2: "",
              userType: ""
            } ))
          }
        })
      }
    }

    handleChangeInput = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };
  
  render(){
    const { classes, value } = this.props;
    return(
      <div>
   <TabContainer>
          <div className={classes.center}>

          {
              this.state.success ? <div style={{ color: "green", textAlign: "center" }} className="para">Successfully Signed Up</div> : null
          }

          <TextField
              id="name"
              label={value === "student" ? "Name" : "Company Name"}
              className={classes.textField}
              value={value === "student" ? this.state.nameStudent: this.state.nameCompany}
              onChange={value === "student" ? this.handleChangeInput('nameStudent'): this.handleChangeInput('nameCompany')}
              margin="normal"
              variant="outlined"
            />
            <br />
            {
              this.state.errors.name ? <div style={{ color: "red" }}>{ this.state.errors.name }</div> : null
            }
            <br />
            <TextField
              id="outlined-name"
              label="Email"
              className={classes.textField}
              value={value === "student" ? this.state.emailStudent: this.state.emailCompany}
              onChange={value === "student" ? this.handleChangeInput('emailStudent'): this.handleChangeInput('emailCompany')}
              margin="normal"
              variant="outlined"
            />
            <br />
            {
              this.state.errors.email ? <div style={{ color: "red" }}>{ this.state.errors.email }</div> : null
            }
            <br />
            <TextField
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              value={value === "student" ? this.state.passwordStudent: this.state.passwordCompany}
              onChange={value === "student" ? this.handleChangeInput('passwordStudent'): this.handleChangeInput('passwordCompany')}
              margin="normal"
              variant="outlined"
            />
            <br />
            {
              this.state.errors.password ? <div style={{ color: "red" }}>{ this.state.errors.password }</div> : null
            }
            <br />
            <TextField
              id="outlined-password2-input"
              label="Confirm Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              value={value === "student" ? this.state.passwordStudent2: this.state.passwordCompany2}
              onChange={value === "student" ? this.handleChangeInput('passwordStudent2'): this.handleChangeInput('passwordCompany2')}
              margin="normal"
              variant="outlined"
            />
            {
              this.state.errors.password2 ? <div style={{ color: "red" }}>{ this.state.errors.password2 }</div> : null
            }
            <br/>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => this.onClick(value)}>
              Sign Up &nbsp;
        <FontAwesomeIcon icon="user-plus" />
            </Button>
          </div>
        </TabContainer>
  </div>
    )
  }
}

class SignUp extends React.Component {
  state = {
    value: 0,
  };

  handleChangeTabs = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <br/>
      <Typography variant="display2" className={classes.title}>Sign Up</Typography>

        <Tabs
          value={value}
          onChange={this.handleChangeTabs}
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Student" icon={<FontAwesomeIcon icon="graduation-cap" />} />
          <Tab label="Company" icon={<FontAwesomeIcon icon="building" />} />
        </Tabs>

        {value === 0 && <RenderForm classes={classes} value="student" />}
        {value === 1 && <RenderForm classes={classes} value="company" />}
        <p className="para">Already have an account? <Link to="/signin">Sign In</Link></p>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
