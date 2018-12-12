import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { withStyles } from '@material-ui/core/styles';
import { getCurrentProfile } from "../../Actions/profileActions";
import ProfileHeader from "./ProfileHeader";

const styles = theme => ({})

class MyProfile extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.getCurrentProfile();
        }
      }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Loader />;
    } else { 
        profileContent = (
        <div>
            <ProfileHeader profile={profile} />
        </div>)
    }
    return (
      <div>
          {profileContent}
      </div>
    );
  }
}

MyProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(withStyles(styles)(MyProfile));
