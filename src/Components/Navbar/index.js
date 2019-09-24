import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Actions/authActions";
// import { getProfileCreated } from "../../Actions/profileActions";
import "./Navbar.css";
import Loader from "../Loader/Loader";
import { NavLink, withRouter, Link } from "react-router-dom";
import compose from "recompose/compose";
import { cvURL, cvDomain } from "../../Variables"
// import isEmpty from "../../validation/is-empty"

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
      if (this.props.auth.isAuthenticated && !this.props.profilecreated) {
        return <Loader />;
      }
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {this.props.auth.isAuthenticated &&
        this.props.auth.user.userType === "student" ? (
          <NavLink
            className="navbar-brand"
            activeClassName={
              window.location.pathname === "/" ? "active" : null
            }
            to="/"
          >
            Talent Pool
          </NavLink>
        ) : this.props.auth.isAuthenticated &&
          this.props.auth.user.userType === "company" ? (
          <NavLink
            className="navbar-brand"
            activeClassName={
              window.location.pathname === "/" ? "active" : null
            }
            to="/"
          >
            Talent Pool
          </NavLink>
        ) : (
          <NavLink
            className="navbar-brand"
            activeClassName={
              window.location.pathname === "/" ? "active" : null
            }
            to="/"
          >
            Talent Pool
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
                  window.location.pathname === "/studentdashboard" ? "active" : null
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
                  window.location.pathname === "/companydashboard" ? "active" : null
                }
                to="/companydashboard"
              >
                Dashboard
              </NavLink>
            ) : (
              <NavLink
                className="nav-item nav-link"
                activeClassName={
                  window.location.pathname === "/publicdashboard" ? "active" : null
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
                  window.location.pathname === "/signup" ? "active" : null
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
                  window.location.pathname === "/signin" ? "active" : null
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
                        window.location.pathname === "/profile" ||
                        window.location.pathname === "/companyprofile"
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
                        window.location.pathname === "/updateprofile" ||
                        window.location.pathname === "/updatecompanyprofile"
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
                    {this.props.auth.user.userType === "student" ? (
                      <NavLink
                        className="dropdown-item"
                        activeClassName={
                          window.location.pathname === "/addeducation" ? "active" : null
                        }
                        to="/addeducation"
                      >
                        Add Education
                      </NavLink>
                    ) : null}
                    {this.props.auth.user.userType === "student" ? (
                      <NavLink
                        className="dropdown-item"
                        activeClassName={
                          window.location.pathname === "/addexperience" ? "active" : null
                        }
                        to="/addexperience"
                      >
                        Add Experience
                      </NavLink>
                    ) : null}
                    {this.props.auth.user.userType === "student" ? (
                      <NavLink
                        className="dropdown-item"
                        activeClassName={
                          window.location.pathname === "/addlanguage" ? "active" : null
                        }
                        to="/addlanguage"
                      >
                        Add Language
                      </NavLink>
                    ) : (
                      <NavLink
                        className="dropdown-item"
                        activeClassName={
                          window.location.pathname === "/addvaccancy" ? "active" : null
                        }
                        to="/addvaccancy"
                      >
                        Add Vaccancy
                      </NavLink>
                    )}
                    {this.props.auth.user.userType === "student" ? (
                      <NavLink
                        className="dropdown-item"
                        activeClassName={
                          window.location.pathname === "/addprojectstu" ? "active" : null
                        }
                        to="/addprojectstu"
                      >
                        Add Project
                      </NavLink>
                    ) : (
                      <NavLink
                        className="dropdown-item"
                        activeClassName={
                          window.location.pathname === "/addproject" ? "active" : null
                        }
                        to="/addproject"
                      >
                        Add Project
                      </NavLink>
                    )}
                     {this.props.auth.user.userType === "student" ? (
                      <NavLink
                        className="dropdown-item"
                        activeClassName={
                          window.location.pathname === "/addextracurricularactivities" ? "active" : null
                        }
                        to="/addextracurricularactivities"
                      >
                        Add Extracurricular Activities
                      </NavLink>
                    ) : null}
                  </div>
                </div>
              ))}
            {this.props.profilecreated &&
            this.props.auth.isAuthenticated &&
            !this.props.profilecreated.profilecreated ? (
              <NavLink
                className="nav-item nav-link"
                activeClassName={
                  window.location.pathname === "/createprofile" ||
                  window.location.pathname === "/createcompanyprofile"
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
            {/* {this.props.profilecreated &&
            this.props.auth.isAuthenticated &&
            this.props.auth.user.userType === "student" ? (
              !this.props.profilecreated.profilecreated ? null : (
                <NavLink
                  className="nav-item nav-link"
                  activeClassName={
                    window.location.pathname === "/addexperience" ? "active" : null
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
                    window.location.pathname === "/addvaccancy" ? "active" : null
                  }
                  to="/addvaccancy"
                >
                  Add Vaccancy
                </NavLink>
              )
            ) : null} */}
            {/* {this.props.profilecreated &&
            this.props.auth.isAuthenticated &&
            this.props.auth.user.userType === "student" ? (
              !this.props.profilecreated.profilecreated ? null : (
                <NavLink
                  className="nav-item nav-link"
                  activeClassName={
                    window.location.pathname === "/addeducation" ? "active" : null
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
                    window.location.pathname === "/addproject" ? "active" : null
                  }
                  to="/addproject"
                >
                  Add Project
                </NavLink>
              )
            ) : null} */}
            {/* {this.props.profilecreated &&
            this.props.auth.isAuthenticated &&
            this.props.auth.user.userType === "student" ? (
              !this.props.profilecreated.profilecreated ? null : (
                <NavLink
                  className="nav-item nav-link"
                  activeClassName={
                    window.location.pathname === "/addlanguage" ? "active" : null
                  }
                  to="/addlanguage"
                >
                  Add Language
                </NavLink>
              )
            ) : null} */}
            {/* {this.props.profilecreated &&
            this.props.auth.isAuthenticated &&
            this.props.auth.user.userType === "student" ? (
              !this.props.profilecreated.profilecreated ? null : (
                <NavLink
                  className="nav-item nav-link"
                  activeClassName={
                    window.location.pathname === "/addprojectstu" ? "active" : null
                  }
                  to="/addprojectstu"
                >
                  Add Project
                </NavLink>
              )
            ) : null} */}
            {this.props.auth.isAuthenticated && (
              <a
                className="nav-item nav-link btn btn-outline-danger btnLogout"
                onClick={this.onLogoutClick}
              >
                Logout
              </a>
            )}
            {this.props.auth.isAuthenticated && this.props.auth.user.userType === "student" && this.props.profilecreated && this.props.profilecreated.profilecreated && (
              //  
               <Link style={{ marginLeft: 20 }} to={`//${cvDomain}/?url=${cvURL}&id=${this.props.auth.user.id}`} className="btn btn-outline-success" target="_blank">Generate CV</Link>
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
