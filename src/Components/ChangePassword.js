import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { changePassword } from "../Actions/authActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


//Tabs

// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

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
  },
  rederrortitle: {
      color: "red",
      fontSize: 20
  },
  success: {
      color: "#4BB543",
      fontSize: 20
  }
});

class RenderForm extends React.Component {

  state = {
    password: "",
    password2: "",
    user: "",
    errors: {},
    loader: false
  };

  handleChangeInput = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentWillReceiveProps(nextProps){
    // if(nextProps.auth.isAuthenticated){
    //     this.props.history.push('/dashboard');
    // }
    
    if(nextProps.errors){
        this.setState({ errors: nextProps.errors, loader: false });
        if(nextProps.errors.success){
          this.setState({ password: "", password2: "", loader: false });
        }
      }
    }

    
  componentDidMount(){
    if(this.props.auth.isAuthenticated) {
      if(this.props.auth.user.userType === "student"){
        this.props.history.push('/studentdashboard');
      } else if(this.props.auth.user.userType === "company"){
        this.props.history.push('/companydashboard');
      }
    }
  }

  onClick = () => {
    const { password, password2 } = this.state;
    const newPassword =  {
      password,
      password2,
      token: this.props.token
    }
    this.props.changePassword(newPassword)
    this.setState({ loader: true });
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return(
      <TabContainer>
           {
              errors.tokenerror ? <Typography variant="display3" className={classes.rederrortitle}>{ this.state.errors.tokenerror }</Typography> : null
           }
           {/* {
              errors.success ? <Typography variant="display3" className={classes.success}>{ this.state.errors.success }. <Link to="/signin">Please Sign In</Link></Typography> : null
           } */}
            {
              this.state.loader ? 
              <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              </div>
              : this.state.errors.success ? <Typography variant="display3" className={classes.success}>{ this.state.errors.success }.  <Link to="/signin">Please Sign In</Link></Typography> : null
          }


            <div className={classes.center}>
            <TextField
              id="outlined-password-input2"
              label="Password"
              className={classes.textField}
              type="password"
              value={this.state.password}
              onChange={this.handleChangeInput('password')}
              margin="normal"
              variant="outlined"
            />
            <br />
            {
              errors.password ? <div style={{ color: "red" }}>{ this.state.errors.password }</div> : null
            }
            <br />
            <TextField
              id="outlined-password-input"
              label="Confirm Password"
              className={classes.textField}
              type="password"
              value={this.state.password2}
              onChange={this.handleChangeInput('password2')}
              margin="normal"
              variant="outlined"
            />
            <br />
            {
              errors.password2 ? <div style={{ color: "red" }}>{ this.state.errors.password2 }</div> : null
            }
            <br />
            <Button variant="contained" color="primary" className={classes.button} onClick={this.onClick} >
              Change Password &nbsp;
        <FontAwesomeIcon icon="sign-in-alt" />
            </Button>
            <p className="para">Already Verified? <Link to="/signin">Sign In</Link></p>
            </div>
          </TabContainer>
    )
}
}

class ChangePassword extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <br/>
        <Typography variant="display2" className={classes.title}>Change Your Password</Typography>
       
        <RenderForm 
            classes={classes} 
            token={this.props.match.params.token} 
            auth={this.props.auth} 
            errors={this.props.errors} 
            history={this.props.history} 
            changePassword={this.props.changePassword}
        />
      </div>
    );
  }
}

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired,
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { changePassword })(withStyles(styles)(ChangePassword));
