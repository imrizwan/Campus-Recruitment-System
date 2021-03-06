import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { confirmUser } from "../Actions/authActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'



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

class RenderForm extends Component {

  state = {
    email: "",
    password: "",
    user: "",
    errors: {},
    loader: false
  };

  handleChangeInput = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps){
    // if(nextProps.auth.isAuthenticated){
    //     this.props.history.push('/dashboard');
    // }
    
    if(nextProps.errors){
        this.setState({ errors: nextProps.errors, loader: false });
        if(nextProps.errors.success){
          this.setState({ email: "", password: "", loader: false });
        }
      }
    }

    
  // componentDidMount(){
  //   if(this.props.auth.isAuthenticated) {
  //     this.props.history.push('/dashboard');
  //   }
  // }

  onClick = () => {
    const { email, password } = this.state;

    const newuser =  {
      email,
      password
    }
    this.props.confirmUser(newuser, this.props.token)
    this.setState({ loader: true });
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return(
      <TabContainer>
           {
              errors.msg ? <Typography variant="h4" style={{ textAlign: "center" }} className={classes.rederrortitle}>{ this.state.errors.msg }</Typography> : null
           }
           {
              this.state.loader ? 
              <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              </div>
              : this.state.errors.success ? <Typography variant="h4" style={{ textAlign: "center" }} className={classes.success}>{ this.state.errors.success }.  <Link to="/signin">Please Sign In</Link></Typography> : null
          }

            <div className={classes.center}>
            <TextField
              id="outlined-name"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChangeInput('email')}
              margin="normal"
              variant="outlined"
            />
            <br />
            {
              errors.email ? <div style={{ color: "red" }}>{ this.state.errors.email }</div> : null
            }
            <br />
            <TextField
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
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
            <Button variant="contained" color="primary" className={classes.button} onClick={this.onClick} >
              Confirm Email &nbsp;
        <FontAwesomeIcon icon="sign-in-alt" />
            </Button>
            <p className="para">Already Verified? <Link to="/signin">Sign In</Link></p>
            </div>
          </TabContainer>
    )
}
}

class Confirmation extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <br/>
        <Typography variant="h3" style={{ textAlign: "center" }} className={classes.title}>Confirm Your Email</Typography>
       
        <RenderForm 
            classes={classes} 
            token={this.props.match.params.token} 
            auth={this.props.auth} 
            errors={this.props.errors} 
            history={this.props.history} 
            confirmUser={this.props.confirmUser}
        />
      </div>
    );
  }
}

Confirmation.propTypes = {
  classes: PropTypes.object.isRequired,
  confirmUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

// export default connect(mapStateToProps, { confirmUser })(withStyles(styles)(Confirmation));
export default compose(
  withStyles(styles),
  connect(mapStateToProps, { confirmUser })
)(withRouter(Confirmation))
