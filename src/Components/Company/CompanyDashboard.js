import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom';
import isEmpty from "../../validation/is-empty"
import Loader from "../Loader/Loader"
import { getProfileCreated } from '../../Actions/companyProfileActions';

class CompanyDashboard extends Component {

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/signin');
    }

    if (this.props.auth.isAuthenticated) {
      this.props.getProfileCreated();
      if (!isEmpty(this.props.profilecreated)) {
        if (!this.props.profilecreated.profilecreated) {
          if (this.props.auth.user.userType === "student") {
            this.props.history.push("/createprofile")
          } else this.props.history.push("/createcompanyprofile")
        }
      }
    }
  }

  render() {
    if (isEmpty(this.props.profilecreated)) { return <Loader /> }
    else {
    return (
      <div>
          CompanyDashboard
      </div>
    );
  }
  }
}

CompanyDashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profilecreated: state.profilecreated.profilecreated,
});

// export default connect(mapStateToProps)(CompanyDashboard);
export default compose(
  connect(mapStateToProps, { getProfileCreated })
)(withRouter(CompanyDashboard))