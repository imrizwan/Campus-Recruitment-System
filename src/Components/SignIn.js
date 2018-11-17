import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//Tabs

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//TextField
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    auth: false,
    anchorEl: null,
    value: 0,
    emailStudent: "",
    passwordStudent: "",
    emailCompany: "",
    passwordCompany: "",
    emailAdmin: "",
    passwordAdmin: ""
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
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

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Campus Recruitment System - Sign In
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
          {/* <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          /> 
          </FormGroup>*/}
        </AppBar>
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
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
