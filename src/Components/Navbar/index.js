import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logoutUser } from "../../Actions/authActions";
// import { getProfileCreated } from "../../Actions/profileActions";
import "./Navbar.css";
import Loader from "../Loader/Loader";
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {

    state= {
      errors: {},
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
      

    render() {
      if(this.props.auth.isAuthenticated){
            if(!this.props.profilecreated){
              return <Loader />;
            }
       }
       
        return(
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          { 
            this.props.auth.isAuthenticated && this.props.auth.user.userType === "student" ?
            // <a className="navbar-brand" onClick={()=> this.redirect("studentdashboard")}>Campus Recruitment System</a> 
            <NavLink className="navbar-brand" activeClassName='active' to="/studentdashboard">Campus Recruitment System</NavLink>
            : this.props.auth.isAuthenticated && this.props.auth.user.userType === "company" ? 
            // <a className="navbar-brand" onClick={()=> this.redirect("companydashboard")}>Campus Recruitment System</a> 
            <NavLink className="navbar-brand" activeClassName='active' to="/companydashboard">Campus Recruitment System</NavLink>
            : <NavLink className="navbar-brand" activeClassName='active' to="/publicdashboard">Campus Recruitment System</NavLink>
            // <a className="navbar-brand" onClick={()=> this.redirect("publicdashboard")}>Campus Recruitment System</a> 
          }
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            { this.props.auth.isAuthenticated && this.props.auth.user.userType === "student" ?
            // <a className="nav-item nav-link active" onClick={()=> this.redirect("studentdashboard")}>Dashboard</a> 
            <NavLink className="nav-item nav-link" activeClassName='active' to="/studentdashboard">Dashboard</NavLink> : 
            this.props.auth.isAuthenticated && this.props.auth.user.userType === "company" ? 
            // <a className="nav-item nav-link active" onClick={()=> this.redirect("companydashboard")}>Dashboard</a> 
            <NavLink className="nav-item nav-link" activeClassName='active' to='/companydashboard'>Dashboard</NavLink>
            : <NavLink className="nav-item nav-link" activeClassName='active' to="/publicdashboard">Dashboard</NavLink>
            // <a className="nav-item nav-link active" onClick={()=> this.redirect("publicdashboard")}>Dashboard</a> 
            }
              {!this.props.auth.isAuthenticated && (
                  // <a className="nav-item nav-link" onClick={() => this.redirect("signup")}>Sign Up</a>
                  <NavLink className="nav-item nav-link" activeClassName='active' to="/signup">Sign Up</NavLink>
              )}
              {!this.props.auth.isAuthenticated && (
                  // <a className="nav-item nav-link" onClick={() => this.redirect("signin")}>Sign In</a>
                  <NavLink className="nav-item nav-link" activeClassName='active' to="/signin">Sign In</NavLink>
              )}
              {this.props.profilecreated && this.props.auth.isAuthenticated && (
                !this.props.profilecreated.profilecreated ? null :
                <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Profile
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  {/* <a className="dropdown-item" onClick={() => this.props.auth.user.userType === "student" ? this.redirect("profile") : this.redirect("companyprofile")}>My Profile</a> */}
                  <NavLink className="dropdown-item" activeClassName='active'  to={this.props.auth.user.userType === "student" ? "/profile" : "/companyprofile"}>My Profile</NavLink>
                  {/* <a className="dropdown-item" onClick={() => this.props.auth.user.userType === "student" ? this.redirect("updateprofile") : this.redirect("updatecompanyprofile")}>Update Profile</a> */}
                  <NavLink className="dropdown-item" activeClassName='active' to={this.props.auth.user.userType === "student" ? "/updateprofile" : "/updatecompanyprofile"}>Update Profile</NavLink>
                </div>
                </div>
              )}
              {this.props.profilecreated && this.props.auth.isAuthenticated && 
                !this.props.profilecreated.profilecreated ? 
                // <a className="nav-item nav-link" onClick={() => this.props.auth.user.userType === "student" ? this.redirect("createprofile") : this.redirect("createcompanyprofile")}>Create Profile</a>
                <NavLink className="nav-item nav-link" activeClassName='active' to={this.props.auth.user.userType === "student" ? "createprofile" : "/createcompanyprofile"}>Create Profile</NavLink>
               : null }
              {this.props.profilecreated && this.props.auth.isAuthenticated && this.props.auth.user.userType === "student" ? (           
                        !this.props.profilecreated.profilecreated ? null : 
                        // <a className="nav-item nav-link" onClick={()=> this.redirect("addexperience")}>Add Experience</a> 
                        <NavLink className="nav-item nav-link" activeClassName='active' to="/addexperience">Add Experience</NavLink>                        
                  ) : this.props.profilecreated && this.props.auth.isAuthenticated ? (
                        !this.props.profilecreated.profilecreated ? null :
                        // <a className="nav-item nav-link" onClick={()=> this.redirect("addvaccancy")}>Add Vaccancy</a>
                        <NavLink className="nav-item nav-link" activeClassName='active' to="/addvaccancy">Add Vaccancy</NavLink>  
                ) : null }
               {this.props.profilecreated && this.props.auth.isAuthenticated && this.props.auth.user.userType === "student" ? (
                        !this.props.profilecreated.profilecreated ? null :
                        // <a className="nav-item nav-link" onClick={()=> this.redirect("addeducation")}>Add Education</a>
                        <NavLink className="nav-item nav-link" activeClassName='active' to="/addeducation">Add Education</NavLink>
                  ) : this.props.profilecreated && this.props.auth.isAuthenticated ? (
                        !this.props.profilecreated.profilecreated ? null :
                        // <a className="nav-item nav-link" onClick={()=> this.redirect("addproject")}>Add Project</a>
                        <NavLink className="nav-item nav-link" activeClassName='active' to="/addproject">Add Project</NavLink>
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

export default connect(mapStateToProps, { logoutUser })(Navbar);