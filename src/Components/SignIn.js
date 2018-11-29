import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

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

class SignIn extends React.Component {
  state = {
    value: 0,
    emailStudent: "",
    passwordStudent: "",
    emailCompany: "",
    passwordCompany: "",
    emailAdmin: "",
    passwordAdmin: ""
  };

    handleChangeTabs = (event, value) => {
    this.setState({ value });
  };

  handleChangeInput = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    console.log(event.target.value);
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1>Sign In</h1>
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
        {value === 0 &&
          <TabContainer>
            <div className={classes.center}>
            <TextField
              id="outlined-name"
              label="Email"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChangeInput('emailStudent')}
              margin="normal"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              value={this.state.name}
              type="password"
              autoComplete="current-password"
              onChange={this.handleChangeInput('passwordStudent')}
              margin="normal"
              variant="outlined"
            />
            <br />
            <Button variant="contained" color="primary" className={classes.button}>
              Login &nbsp;
        <FontAwesomeIcon icon="sign-in-alt" />
            </Button>
            </div>
          </TabContainer>}
        {value === 1 && <TabContainer>
            <div className={classes.center}>
            <TextField
              id="outlined-name"
              label="Email"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChangeInput('emailCompany')}
              margin="normal"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              value={this.state.name}
              type="password"
              autoComplete="current-password"
              onChange={this.handleChangeInput('passwordCompany')}
              margin="normal"
              variant="outlined"
            />
            <br />
            <Button variant="contained" color="primary" className={classes.button}>
              Login &nbsp;
        <FontAwesomeIcon icon="sign-in-alt" />
            </Button>
            </div>
          </TabContainer>}
        {value === 2 && <TabContainer>
            <div className={classes.center}>
            <TextField
              id="outlined-name"
              label="Email"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChangeInput('emailCompany')}
              margin="normal"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              value={this.state.name}
              type="password"
              autoComplete="current-password"
              onChange={this.handleChangeInput('passwordCompany')}
              margin="normal"
              variant="outlined"
            />
            <br />
            <Button variant="contained" color="primary" className={classes.button}>
              Login &nbsp;
        <FontAwesomeIcon icon="sign-in-alt" />
            </Button>
            </div>
          </TabContainer>}

          <p className="para">Create an account: <Link to="/signup">Signup</Link></p>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
