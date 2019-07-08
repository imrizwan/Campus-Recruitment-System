import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resend } from "../Actions/authActions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
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

class RenderForm extends React.Component {

  state = {
    email: "",
    errors: {}
  };

  handleChangeInput = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
        this.props.history.push('/dashboard');
    }
    
    if(nextProps.errors){
        this.setState({ errors: nextProps.errors });
      }
    }

    
  componentDidMount(){
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onClick = () => {
    const { email } = this.state;

    const user =  {
      email
    }
    this.props.resend(user)
    
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return(
      <TabContainer>
           {
              errors.msg ? <Typography variant="display3" className={classes.rederrortitle}>{ this.state.errors.msg }</Typography> : null
           }
           {
              errors.success ? <Typography variant="display3" className={classes.success}>{ this.state.errors.success }. <Link to="/signin">Please Sign In</Link></Typography> : null
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
            <br />
            <Button variant="contained" color="primary" className={classes.button} onClick={this.onClick} >
              Resend Verification Email &nbsp;
        <FontAwesomeIcon icon="sign-in-alt" />
            </Button>
            <p className="para">Already Verified? <Link to="/signin">Sign In</Link></p>
            </div>
          </TabContainer>
    )
}
}

class Resend extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <br/>
        <Typography variant="display2" className={classes.title}>Resend Verification Email</Typography>
       
        <RenderForm 
            classes={classes} 
            token={this.props.match.params.token} 
            auth={this.props.auth} 
            errors={this.props.errors} 
            history={this.props.history} 
            resend={this.props.resend}
        />
      </div>
    );
  }
}

Resend.propTypes = {
  classes: PropTypes.object.isRequired,
  resend: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

// export default connect(mapStateToProps, { resend })(withStyles(styles)(Resend));
export default compose(
  withStyles(styles),
  connect(mapStateToProps, { resend })
)(withRouter(Resend))
