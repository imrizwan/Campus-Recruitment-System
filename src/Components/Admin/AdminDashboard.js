import React from "react";
import { getAllProfiles, deleteUser } from "../../Actions/adminActions";
import isEmpty from "../../validation/is-empty";
import Loader from "../Loader/Loader";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  textField: {
    width: "100%"
  },
  button: {
    width: "100%"
  },
  center: {
    margin: "0 auto",
    width: "60%"
  }
});

class AdminDashboard extends React.Component {
  state = {
    id: ""
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    //its gonna fetch the profile
    if (this.props.auth.isAuthenticated) {
      this.props.getAllProfiles();
    }
  }

  deleteUser = (id) => {
    this.props.deleteUser(id)
  }

  render() {
    const { classes } = this.props;
    if (isEmpty(this.props.getallprofiles)) {
      return <Loader />;
    } else {
      return (
        <div>
          <Typography
            variant="h3"
            style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}
            className={classes.title}
          >
            Students
          </Typography>
          {isEmpty(this.props.getallprofiles)
            ? null
            : isEmpty(
                this.props.getallprofiles.filter(
                  data => data.userType === "student"
                )
              )
            ? null
            : this.props.getallprofiles
                .filter(data => data.userType === "student")
                .map(item => (
                  <div className="card mx-4 mb-4" key={item._id}>
                    <div className="card-header">{item.fullname}</div>
                    <div className="card-body">
                      <h5 className="card-title">Username: {item.username}</h5>
                      <p className="card-text">Email: {item.email}</p>
                      {item.isVerified ? (
                        <div className="alert alert-success" role="alert">
                          Verified
                        </div>
                      ) : (
                        <div className="alert alert-danger" role="alert">
                          Unverified
                        </div>
                      )}
                      <Link to={`/adminviewstudentprofile/${item._id}`} className="btn btn-primary">
                        View Profile
                      </Link>
                      <button className="btn btn-danger mx-2" onClick={()=>this.deleteUser(item._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
          <Typography
            variant="h3"
            style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}
            className={classes.title}
          >
            Company
          </Typography>
          {isEmpty(this.props.getallprofiles)
            ? null
            : isEmpty(
                this.props.getallprofiles.filter(
                  data => data.userType === "company"
                )
              )
            ? null
            : this.props.getallprofiles
                .filter(data => data.userType === "company")
                .map(item => (
                  <div className="card mx-4 mb-4" key={item._id}>
                    <div className="card-header">{item.fullname}</div>
                    <div className="card-body">
                      <h5 className="card-title">Username: {item.username}</h5>
                      <p className="card-text">Email: {item.email}</p>
                      {item.isVerified ? (
                        <div className="alert alert-success" role="alert">
                          Verified
                        </div>
                      ) : (
                        <div className="alert alert-danger" role="alert">
                          Unverified
                        </div>
                      )}
                      <Link to={`/adminviewcompanyprofile/${item._id}`} className="btn btn-primary">
                        View Profile
                      </Link>
                      <button className="btn btn-danger mx-2" onClick={()=>this.deleteUser(item._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  // profile: state.profile.profile,
  errors: state.errors,
  getallprofiles: state.admin.getallprofiles,
  deleteuser: state.admin.deleteuser,
  auth: state.auth
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getAllProfiles, deleteUser }
  )
)(withRouter(AdminDashboard));
