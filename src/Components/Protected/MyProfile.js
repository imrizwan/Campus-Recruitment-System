import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { withStyles } from '@material-ui/core/styles';
import { getCurrentProfile, getProfileCreated } from "../../Actions/profileActions";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'

const styles = theme => ({})

class MyProfile extends Component {

    state = {
      errors: {}
    }

      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

      componentWillMount(){
        if (this.props.auth.isAuthenticated) {
          this.props.getCurrentProfile();
        }
      }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
        if (profile === null || loading) {
                return(
                    <Loader />
                )
          } else { 
        profileContent = (
        <div>
            <ProfileHeader profile={profile} fullname={this.props.auth.user.fullname} />
            <ProfileAbout profile={profile} />
            <ProfileCreds profile={profile} />
        </div>
        )
    }
    return (
      <div>
          {profileContent}
      </div>
    );
  }
}

MyProfile.propTypes = {
    getProfileCreated: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    errors: state.errors,
    profilecreated: state.profilecreated.profilecreated
});

// export default connect(mapStateToProps, { getCurrentProfile, getProfileCreated })(withStyles(styles)(MyProfile));
export default compose(
  withStyles(styles),
  connect(mapStateToProps, { getCurrentProfile, getProfileCreated })
)(withRouter(MyProfile))