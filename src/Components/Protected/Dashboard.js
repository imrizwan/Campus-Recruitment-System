import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'
import Loader from "../Loader/Loader"
import isEmpty from "../../validation/is-empty"
import { getProfileCreated, getCompanies } from "../../Actions/profileActions"

class Dashboard extends Component {

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/signin');
    }



    if (this.props.auth.isAuthenticated) {
      this.props.getProfileCreated();   
      this.props.getCompanies();   
      if(!isEmpty(this.props.profilecreated)){
          if(!this.props.profilecreated.profilecreated){
              // if(this.props.auth.user.userType === "student"){
              //     this.props.history.push("/createprofile")
              // } else this.props.history.push("/createcompanyprofile")
          }
      }         
  }
  }

  render() {
    if(isEmpty(this.props.profilecreated) && isEmpty(this.props.companyprofiles)) { return <Loader/> } else {
      // !isEmpty(this.props.companyprofiles) ? console.log(this.props.companyprofiles) : null
      return (
        <div>
            Dashboard
        </div>
      );
    }
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getProfileCreated: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profilecreated: state.profilecreated.profilecreated,
  companyprofiles: state.profile.companyprofiles,
});

// export default connect(mapStateToProps)(Dashboard);
export default compose(
  connect(mapStateToProps, { getProfileCreated, getCompanies })
)(withRouter(Dashboard))