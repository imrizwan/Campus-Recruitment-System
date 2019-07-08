import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { loginUser } from "../Actions/authActions";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose'
//Tabs

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//TextField
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import "./index.css";
//import { } from '../Variables';

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
    emailAdmin: "",
    passwordAdmin: "",
    user: "",
    errors: {}
  };

  handleChangeInput = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated && nextProps.auth.user.userType === "student"){
        this.props.history.push('/studentdashboard');
    } else if(nextProps.auth.isAuthenticated && nextProps.auth.user.userType === "company"){
      this.props.history.push('/companydashboard');
    }
    
    if(nextProps.errors){
        this.setState({ errors: nextProps.errors });
      }
    }

    
  componentDidMount(){
    if(this.props.auth.isAuthenticated && this.props.auth.user.userType === "student"){
      this.props.history.push('/studentdashboard');
  } else if(this.props.auth.isAuthenticated && this.props.auth.user.userType === "company"){
    this.props.history.push('/companydashboard');
  }
  }

  onClick = (value) => {
    const { emailAdmin, emailCompany, emailStudent, passwordStudent, passwordCompany, passwordAdmin } = this.state;

    const newuser = value === "admin" ? {
      email: emailAdmin,
      password: passwordAdmin, 
      userType: value
    } : value === "student" ? {
      email: emailStudent,
      password: passwordStudent, 
      userType: value
    } : {
      email: emailCompany,
      password: passwordCompany, 
      userType: value
    }

    this.props.loginUser(newuser);
  }

  render() {
    const { classes, value } = this.props;
    const { errors } = this.state;
    return(
      <TabContainer>
            <div className={classes.center}>
            {
              errors.userType ? <div style={{ color: "red" }}>{ this.state.errors.userType }</div> : null
            }
            <TextField
              id="outlined-name"
              label="Email"
              className={classes.textField}
              value={value === "admin" ? this.state.emailAdmin : value === "student" ? this.state.emailStudent : this.state.emailCompany}
              onChange={value === "admin" ? this.handleChangeInput('emailAdmin'): value === "student" ? this.handleChangeInput('emailStudent') : this.handleChangeInput('emailCompany')}
              margin="normal"
              variant="outlined"
            />
            <br />
            {
              errors.email ? <div style={{ color: "red" }}>{ this.state.errors.email }</div> : null
            }
             {
              errors.resend ? <div style={{ color: "black" }}><Link to="/resend">{ this.state.errors.resend }</Link></div> : null
            }
            <br />
            <TextField
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              value={value === "admin" ? this.state.passwordAdmin : value === "student" ? this.state.passwordStudent : this.state.passwordCompany}
              onChange={value === "admin" ? this.handleChangeInput('passwordAdmin'): value === "student" ? this.handleChangeInput('passwordStudent') : this.handleChangeInput('passwordCompany')}
              margin="normal"
              variant="outlined"
            />
            <br />
            {
              errors.password ? <div style={{ color: "red" }}>{ this.state.errors.password }</div> : null
            }
            <br />
            <Button variant="contained" color="primary" className={classes.button} onClick={ () => this.onClick(value) } >
              Login &nbsp;
        <FontAwesomeIcon icon="sign-in-alt" />
            </Button>
            </div>
          </TabContainer>
    )
}
}

class SignIn extends React.Component {
  state = {
    value: 0
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
        {/* <Typography variant="display2" className={classes.title}>Sign In</Typography> */}
        <Typography variant="display2" className={classes.title}>Sign In</Typography>
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
          <Tab label="Admin" icon={<FontAwesomeIcon icon="lock" />} />
        </Tabs>
        {value === 0 && <RenderForm classes={classes} value="student" auth={this.props.auth} errors={this.props.errors} history={this.props.history} loginUser={this.props.loginUser} />}
        {value === 1 && <RenderForm classes={classes} value="company" auth={this.props.auth} errors={this.props.errors} history={this.props.history} loginUser={this.props.loginUser}/>}
        {value === 2 && <RenderForm classes={classes} value="admin" auth={this.props.auth} errors={this.props.errors} history={this.props.history} loginUser={this.props.loginUser}/>}

          <p className="para">Create an account: <Link to="/signup">Signup</Link></p>
          <p className="para"><Link to="/forgotpassword">Forgot Password?</Link></p>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

// export default connect(mapStateToProps, { loginUser })(withStyles(styles)(SignIn));
export default compose(
  withStyles(styles),
  connect(mapStateToProps, { loginUser })
)(withRouter(SignIn))
