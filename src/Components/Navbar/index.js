import React from "react";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { logoutUser } from "../../Actions/authActions";

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

class Navbar extends React.Component {

    
    state = {
        anchorEl: null
      };
    
      handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

      onLogoutClick = (e) => {
        e.preventDefault();
        this.setState({ anchorEl: null });
        this.props.logoutUser(this.props.history);
      };

      redirect = value => {
        //window.location.href= `/${value}`;
        this.setState({ anchorEl: null });
        this.props.history.push(`/${value}`)
      };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return(
            <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Campus Recruitment System
            </Typography>
            {!this.props.auth.isAuthenticated && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <FontAwesomeIcon icon="user" />
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
                  <MenuItem onClick={() => this.redirect("signup")}>Sign Up</MenuItem>
                  <MenuItem onClick={() => this.redirect("signin")}>Sign In</MenuItem>
                </Menu>
              </div>
            )}
            {this.props.auth.isAuthenticated && (
              <div>
                <p>Hello {this.props.auth.user.fullname}<IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <FontAwesomeIcon icon="user" />
                </IconButton></p>
                {/* <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                <img  src={this.props.auth.user.avatar} alt={this.props.auth.user.name} title={this.props.auth.user.name} style={{ width: '25px', borderRadius: '25px' }} />
                </IconButton> */}
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
                  <MenuItem onClick={this.onLogoutClick}>Logout</MenuItem>
                  <MenuItem onClick={() => this.props.auth.user.userType === "student" ? this.redirect("profile") : this.redirect("companyprofile")}>My Profile</MenuItem>
                  <MenuItem onClick={() => this.props.auth.user.userType === "student" ? this.redirect("updateprofile") : this.redirect("updatecompanyprofile")}>Update Profile</MenuItem>
                  {this.props.auth.user.userType === "student" ? 
                    <MenuItem onClick={()=> this.redirect("addeducation")}>Add Education</MenuItem> :
                    <MenuItem onClick={()=> this.redirect("addvaccancy")}>Add Vaccancy</MenuItem>
                  }
                  {this.props.auth.user.userType === "student" ? 
                    <MenuItem onClick={()=> this.redirect("addexperience")}>Add Experience</MenuItem> :
                    <MenuItem onClick={()=> this.redirect("addproject")}>Add Project</MenuItem>
                  }
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        )
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(Navbar));