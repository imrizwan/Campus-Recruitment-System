import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { withStyles } from '@material-ui/core/styles';
import { getCurrentProfile, getProfileCreated } from "../../Actions/profileActions";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";

const styles = theme => ({})

class MyProfile extends Component {

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.getCurrentProfile();
        }
      }

      componentWillMount(){

        var profilecreatedVar = JSON.parse(localStorage.getItem('profilecreated'));
        if (this.props.auth.isAuthenticated) {
            // this.props.getProfileCreated(this.props.history, this.props.match.url);      
            if(!profilecreatedVar){
                this.props.history.push('/createprofile');
            }
        }
      }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if(!this.props.profile) {
       this.props.history.push('/createprofile');
      }
    if (profile === null || loading) {
      profileContent = <Loader />;
    } else { 
        profileContent = (
            JSON.parse(localStorage.getItem('profilecreated')) ? 
        <div>
            <ProfileHeader profile={profile} fullname={this.props.auth.user.fullname} />
            <ProfileAbout profile={profile} />
            <ProfileCreds profile={profile} />
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

MyProfile.propTypes = {
    getProfileCreated: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, getProfileCreated })(withStyles(styles)(MyProfile));
