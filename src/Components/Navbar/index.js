import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logoutUser } from "../../Actions/authActions";
import { getProfileCreated } from "../../Actions/profileActions";
import "./Navbar.css";
import Loader from "../Loader/Loader";

class Navbar extends React.Component {

    state= {
      errors: {}
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
      }
      componentWillMount() {
        //its gonna fetch the profile
        if (this.props.auth.isAuthenticated) {
          this.props.getProfileCreated();
        }
      }

    render() {
      console.log(this.props.profilecreated) 
      if(this.props.auth.user.isAuthenticated){
            if(!this.props.profilecreated){
              return <Loader />;
            }
       }
        
        return(
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          { 
            this.props.auth.isAuthenticated && this.props.auth.user.userType === "student" ?
            <a className="navbar-brand" onClick={()=> this.redirect("studentdashboard")}>Campus Recruitment System</a> : 
            this.props.auth.isAuthenticated && this.props.auth.user.userType === "company" ? 
            <a className="navbar-brand" onClick={()=> this.redirect("companydashboard")}>Campus Recruitment System</a> : 
            <a className="navbar-brand" onClick={()=> this.redirect("publicdashboard")}>Campus Recruitment System</a> 
          }
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            { this.props.auth.isAuthenticated && this.props.auth.user.userType === "student" ?
            <a className="nav-item nav-link active" onClick={()=> this.redirect("studentdashboard")}>Dashboard</a> : 
            this.props.auth.isAuthenticated && this.props.auth.user.userType === "company" ? 
            <a className="nav-item nav-link active" onClick={()=> this.redirect("companydashboard")}>Dashboard</a> : 
            <a className="nav-item nav-link active" onClick={()=> this.redirect("publicdashboard")}>Dashboard</a> }
              {!this.props.auth.isAuthenticated && (
                  <a className="nav-item nav-link" onClick={() => this.redirect("signup")}>Sign Up</a>
              )}
              {!this.props.auth.isAuthenticated && (
                  <a className="nav-item nav-link" onClick={() => this.redirect("signin")}>Sign In</a>
              )}
              {this.props.profilecreated && this.props.auth.isAuthenticated && (
                !this.props.profilecreated.profilecreated ? null :
                <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Profile
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" onClick={() => this.props.auth.user.userType === "student" ? this.redirect("profile") : this.redirect("companyprofile")}>My Profile</a>
                  <a className="dropdown-item" onClick={() => this.props.auth.user.userType === "student" ? this.redirect("updateprofile") : this.redirect("updatecompanyprofile")}>Update Profile</a>
                </div>
                </div>
              )}
              {this.props.profilecreated && this.props.auth.isAuthenticated && 
                !this.props.profilecreated.profilecreated ? 
                <a className="nav-item nav-link" onClick={() => this.props.auth.user.userType === "student" ? this.redirect("createprofile") : this.redirect("createcompanyprofile")}>Create Profile</a>
               : null }
              {this.props.profilecreated && this.props.auth.isAuthenticated && this.props.auth.user.userType === "student" ? (           
                        !this.props.profilecreated.profilecreated ? null : <a className="nav-item nav-link" onClick={()=> this.redirect("addexperience")}>Add Experience</a>
                  ) : this.props.profilecreated && this.props.auth.isAuthenticated ? (
                        !this.props.profilecreated.profilecreated ? null :<a className="nav-item nav-link" onClick={()=> this.redirect("addvaccancy")}>Add Vaccancy</a>
                ) : null }
               {this.props.profilecreated && this.props.auth.isAuthenticated && this.props.auth.user.userType === "student" ? (
                        !this.props.profilecreated.profilecreated ? null :<a className="nav-item nav-link" onClick={()=> this.redirect("addeducation")}>Add Education</a>
                  ) : this.props.profilecreated && this.props.auth.isAuthenticated ? (
                        !this.props.profilecreated.profilecreated ? null :<a className="nav-item nav-link" onClick={()=> this.redirect("addproject")}>Add Project</a>
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
    getProfileCreated: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

const mapStateToProps = (state) => ({
  auth: state.auth,
  profilecreated: state.profilecreated.profilecreated
});

export default connect(mapStateToProps, { logoutUser, getProfileCreated })(Navbar);