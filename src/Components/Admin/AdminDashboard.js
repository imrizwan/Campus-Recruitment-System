import React from "react";
// import { getCurrentProfile } from "../../Actions/profileActions";
// import isEmpty from "../../validation/is-empty";
// import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom';

class AdminDashboard extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

//   componentDidMount() {
//     //its gonna fetch the profile
//     if (this.props.auth.isAuthenticated) {
//       this.props.getCurrentProfile();
//     }
//   }

  render() {
    return <div>AdminDashboard</div>;
  }
}

const mapStateToProps = state => ({
    // profile: state.profile.profile,
    errors: state.errors,
    auth: state.auth,
  });
  
  export default compose(
    connect(mapStateToProps, { })
  )(withRouter(AdminDashboard))
