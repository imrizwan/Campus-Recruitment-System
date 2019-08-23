import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Actions/authActions";
// import { getProfileCreated } from "../../Actions/profileActions";
import "./Navbar.css";
import Loader from "../Loader/Loader";
import { NavLink, withRouter } from "react-router-dom";
import compose from "recompose/compose";

class Navbar extends React.Component {
  state = {
    errors: {},
    // profilecreated: {},
    path: ""
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.setState({ anchorEl: null });
    this.props.logoutUser(this.props.history);
  };

  redirect = value => {
    this.props.history.push(`/${value}`);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    if (this.props.auth.isAuthenticated) {
      if (!this.props.profilecreated) {
        return <Loader />;
      }
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {this.props.auth.isAuthenticated &&
        this.props.auth.user.userType === "student" ? (
          <NavLink
            className="navbar-brand"
            activeClassName={
              this.state.path === "/studentdashboard" ? "active" : null
            }
            to="/studentdashboard"
          >
            Campus Recruitment System
          </NavLink>
        ) : this.props.auth.isAuthenticated &&
          this.props.auth.user.userType === "company" ? (
          <NavLink
            className="navbar-brand"
            activeClassName={
              this.state.path === "/companydashboard" ? "active" : null
            }
            to="/companydashboard"
          >
            Campus Recruitment System
          </NavLink>
        ) : (
          <NavLink
            className="navbar-brand"
            activeClassName={
              this.state.path === "/publicdashboard" ? "active" : null
            }
            to="/publicdashboard"
          >
            Campus Recruitment System
          </NavLink>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {this.props.auth.isAuthenticated &&
            this.props.auth.user.userType === "student" ? (
              <NavLink
                className="nav-item nav-link"
                activeClassName={
                  this.state.path === "/studentdashboard" ? "active" : null
                }
                to="/studentdashboard"
              >
                Dashboard
              </NavLink>
            ) : this.props.auth.isAuthenticated &&
              this.props.auth.user.userType === "company" ? (
              <NavLink
                className="nav-item nav-link"
                activeClassName={
                  this.state.path === "/companydashboard" ? "active" : null
                }
                to="/companydashboard"
              >
                Dashboard
              </NavLink>
            ) : (
              <NavLink
                className="nav-item nav-link"
                activeClassName={
                  this.state.path === "/publicdashboard" ? "active" : null
                }
                to="/publicdashboard"
              >
                Dashboard
              </NavLink>
            )}
            {!this.props.auth.isAuthenticated && (
              <NavLink
                className="nav-item nav-link"
                activeClassName={
                  this.state.path === "/signup" ? "active" : null
                }
                to="/signup"
              >
                Sign Up
              </NavLink>
            )}
            {!this.props.auth.isAuthenticated && (
              <NavLink
                className="nav-item nav-link"
                activeClassName={
                  this.state.path === "/signin" ? "active" : null
                }
                to="/signin"
              >
                Sign In
              </NavLink>
            )}
            {this.props.profilecreated &&
              this.props.auth.isAuthenticated &&
              (!this.props.profilecreated.profilecreated ? null : (
                <div className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Profile
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <NavLink
                      className="dropdown-item"
                      activeClassName={
                        this.state.path === "/profile" ||
                        this.state.path === "/companyprofile"
                          ? "active"
                          : null
                      }
                      to={
                        this.props.auth.user.userType === "student"
                          ? "/profile"
                          : "/companyprofile"
                      }
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      className="dropdown-item"
                      activeClassName={
                        this.state.path === "/updateprofile" ||
                        this.state.path === "/updatecompanyprofile"
                          ? "active"
                          : null
                      }
                      to={
                        this.props.auth.user.userType === "student"
                          ? "/updateprofile"
                          : "/updatecompanyprofile"
                      }
                    >
                      Update Profile
                    </NavLink>
                  </div>
                </div>
              ))}
            {this.props.profilecreated &&
            this.props.auth.isAuthenticated &&
            !this.props.profilecreated.profilecreated ? (
              <NavLink
                className="nav-item nav-link"
                activeClassName={
                  this.state.path === "/createprofile" ||
                  this.state.path === "/createcompanyprofile"
                    ? "active"
                    : null
                }
                to={
                  this.props.auth.user.userType === "student"
                    ? "/createprofile"
                    : "/createcompanyprofile"
                }
              >
                Create Profile
              </NavLink>
            ) : null}
            {this.props.profilecreated &&
            this.props.auth.isAuthenticated &&
            this.props.auth.user.userType === "student" ? (
              !this.props.profilecreated.profilecreated ? null : (
                <NavLink
                  className="nav-item nav-link"
                  activeClassName={
                    this.state.path === "/addexperience" ? "active" : null
                  }
                  to="/addexperience"
                >
                  Add Experience
                </NavLink>
              )
            ) : this.props.profilecreated && this.props.auth.isAuthenticated ? (
              !this.props.profilecreated.profilecreated ? null : (
                <NavLink
                  className="nav-item nav-link"
                  activeClassName={
                    this.state.path === "/addvaccancy" ? "active" : null
                  }
                  to="/addvaccancy"
                >
                  Add Vaccancy
                </NavLink>
              )
            ) : null}
            {this.props.profilecreated &&
            this.props.auth.isAuthenticated &&
            this.props.auth.user.userType === "student" ? (
              !this.props.profilecreated.profilecreated ? null : (
                <NavLink
                  className="nav-item nav-link"
                  activeClassName={
                    this.state.path === "/addeducation" ? "active" : null
                  }
                  to="/addeducation"
                >
                  Add Education
                </NavLink>
              )
            ) : this.props.profilecreated && this.props.auth.isAuthenticated ? (
              !this.props.profilecreated.profilecreated ? null : (
                <NavLink
                  className="nav-item nav-link"
                  activeClassName={
                    this.state.path === "/addproject" ? "active" : null
                  }
                  to="/addproject"
                >
                  Add Project
                </NavLink>
              )
            ) : null}
            {this.props.profilecreated &&
            this.props.auth.isAuthenticated &&
            this.props.auth.user.userType === "student" ? (
              !this.props.profilecreated.profilecreated ? null : (
                <NavLink
                  className="nav-item nav-link"
                  activeClassName={
                    this.state.path === "/addlanguage" ? "active" : null
                  }
                  to="/addlanguage"
                >
                  Add Language
                </NavLink>
              )
            ) : null}
            {this.props.auth.isAuthenticated && (
              <a
                className="nav-item nav-link btn btn-outline-danger btnLogout"
                onClick={this.onLogoutClick}
              >
                Logout
              </a>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

// export default connect(mapStateToProps, { logoutUser })(Navbar);

// export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar))
export default compose(
  connect(
    mapStateToProps,
    { logoutUser }
  )
)(withRouter(Navbar));
