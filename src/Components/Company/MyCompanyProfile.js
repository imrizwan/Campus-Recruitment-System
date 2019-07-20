import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { withStyles } from '@material-ui/core/styles';
import { getProfileCreated } from "../../Actions/profileActions";
import { getCurrentCompanyProfile } from "../../Actions/companyProfileActions";
import ProfileHeader from "./ProfileHeader";
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom';
import isEmpty from "../../validation/is-empty"

const styles = theme => ({
  
})

class MyCompanyProfile extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.getCurrentCompanyProfile();
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
    const { profile, loading } = this.props.profile;
    let profileContent;
    if(!this.props.profile) {
       this.props.history.push('/createcompanyprofile');
      }
    if (profile === null || loading || isEmpty(this.props.profilecreated)) {
      profileContent = <Loader />;
    } else { 
        profileContent = (
            this.props.profilecreated.profilecreated ? 
        <div>
            <ProfileHeader profile={profile} fullname={this.props.auth.user.fullname} />
        </div>
        : <div>Create Your Profile First</div>
        )
    }
    return (
      <div>
          {profileContent}
      </div>
    );
  }
}

MyCompanyProfile.propTypes = {
    getProfileCreated: PropTypes.func.isRequired,
    getCurrentCompanyProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    profilecreated: state.profilecreated.profilecreated
});

// export default connect(mapStateToProps, { getCurrentCompanyProfile, getProfileCreated })(withStyles(styles)(MyCompanyProfile));
export default compose(
  withStyles(styles),
  connect(mapStateToProps, { getCurrentCompanyProfile, getProfileCreated })
)(withRouter(MyCompanyProfile))
