import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logoutUser } from "../../Actions/authActions";
// import { getProfileCreated } from "../../Actions/profileActions";
import "./Navbar.css";
import Loader from "../Loader/Loader";
import { NavLink, withRouter } from 'react-router-dom';
import compose from 'recompose/compose'

class Navbar extends React.Component {

    state= {
      errors: {},
      path: this.props.history.location.pathname
      // profilecreated: {}
    }

      onLogoutClick = (e) => {
        e.preventDefault();
        this.setState({ anchorEl: null });
        this.props.logoutUser(this.props.history);
      };

      redirect = value => {
        this.props.history.push(`/${value}`)
      };

      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
      //   if (nextProps.profilecreated) {
      //     this.setState({ profilecreated: nextProps.profilecreated });
      // }
      }
      // componentWillMount() {
      //   //its gonna fetch the profile
      //   if (this.props.auth.isAuthenticated) {
      //     this.props.getProfileCreated();
      //   }
      // }

    update = () => {
      this.forceUpdate();
    }
      

    render() {

      let { path } = this.state;
      // console.log(this.props.location)
      if(this.props.auth.isAuthenticated){
            if(!this.props.profilecreated){
              return <Loader />;
            }
       }
        return(
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          { 
            this.props.auth.isAuthenticated && this.props.auth.user.userType === "student" ?
            <NavLink className="navbar-brand" activeClassName={path==="/studentdashboard"  ? "active": null} to="/studentdashboard" onClick={this.update}>Campus Recruitment System</NavLink>
            : this.props.auth.isAuthenticated && this.props.auth.user.userType === "company" ? 
            <NavLink className="navbar-brand" activeClassName={path==="/companydashboard"  ? "active": null} to="/companydashboard" onClick={this.update}>Campus Recruitment System</NavLink>
            : <NavLink className="navbar-brand" activeClassName={path==="/publicdashboard"  ? "active": null} to="/publicdashboard" onClick={this.update}>Campus Recruitment System</NavLink>
          }
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            { this.props.auth.isAuthenticated && this.props.auth.user.userType === "student" ?
            <NavLink className="nav-item nav-link" activeClassName={path==="/studentdashboard"  ? "active": null} to="/studentdashboard" onClick={this.update}>Dashboard</NavLink> : 
            this.props.auth.isAuthenticated && this.props.auth.user.userType === "company" ? 
            <NavLink className="nav-item nav-link" activeClassName={path==="/companydashboard"  ? "active": null} to='/companydashboard' onClick={this.update}>Dashboard</NavLink>
            : <NavLink className="nav-item nav-link" activeClassName={path==="/publicdashboard"  ? "active": null} to="/publicdashboard" onClick={this.update}>Dashboard</NavLink>
            }
              {!this.props.auth.isAuthenticated && (
                  <NavLink className="nav-item nav-link" activeClassName={path==="/signup"  ? "active": null} to="/signup" onClick={this.update}>Sign Up</NavLink>
              )}
              {!this.props.auth.isAuthenticated && (
                  <NavLink className="nav-item nav-link" activeClassName={path==="/signin"  ? "active": null} to="/signin" onClick={this.update}>Sign In</NavLink>
              )}
              {this.props.profilecreated && this.props.auth.isAuthenticated && (
                !this.props.profilecreated.profilecreated ? null :
                <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Profile
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <NavLink className="dropdown-item" activeClassName={path==="/profile" || path==="/companyprofile" ? "active": null}  to={this.props.auth.user.userType === "student" ? "/profile" : "/companyprofile"} onClick={this.update}>My Profile</NavLink>
                  <NavLink className="dropdown-item" activeClassName={path==="/updateprofile" || path==="/updatecompanyprofile"  ? "active": null} to={this.props.auth.user.userType === "student" ? "/updateprofile" : "/updatecompanyprofile"} onClick={this.update}>Update Profile</NavLink>
                </div>
                </div>
              )}
              {this.props.profilecreated && this.props.auth.isAuthenticated && 
                !this.props.profilecreated.profilecreated ? 
                <NavLink className="nav-item nav-link" activeClassName={path==="/createprofile" || path==="/createcompanyprofile" ? "active": null} to={this.props.auth.user.userType === "student" ? "/createprofile" : "/createcompanyprofile"} onClick={this.update}>Create Profile</NavLink>
               : null }
              {this.props.profilecreated && this.props.auth.isAuthenticated && this.props.auth.user.userType === "student" ? (           
                        !this.props.profilecreated.profilecreated ? null : 
                        <NavLink className="nav-item nav-link" activeClassName={path==="/addexperience"  ? "active": null} to="/addexperience" onClick={this.update}>Add Experience</NavLink>                        
                  ) : this.props.profilecreated && this.props.auth.isAuthenticated ? (
                        !this.props.profilecreated.profilecreated ? null :
                        <NavLink className="nav-item nav-link" activeClassName={path==="/addvaccancy"  ? "active": null} to="/addvaccancy" onClick={this.update}>Add Vaccancy</NavLink>  
                ) : null }
               {this.props.profilecreated && this.props.auth.isAuthenticated && this.props.auth.user.userType === "student" ? (
                        !this.props.profilecreated.profilecreated ? null :
                        <NavLink className="nav-item nav-link" activeClassName={path==="/addeducation"  ? "active": null} to="/addeducation" onClick={this.update}>Add Education</NavLink>
                  ) : this.props.profilecreated && this.props.auth.isAuthenticated ? (
                        !this.props.profilecreated.profilecreated ? null :
                        <NavLink className="nav-item nav-link" activeClassName={path==="/addproject"  ? "active": null} to="/addproject" onClick={this.update}>Add Project</NavLink>
                ) : null }
               {this.props.auth.isAuthenticated && (
                   <a className="nav-item nav-link btn btn-outline-danger btnLogout" onClick={this.onLogoutClick}>Logout</a>
                )}
            </div>
          </div>
          </nav>
       )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// export default connect(mapStateToProps, { logoutUser })(Navbar);

// export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar))
export default compose(
  connect(mapStateToProps, { logoutUser })
)(withRouter(Navbar))