import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { withStyles } from '@material-ui/core/styles';
import { getCurrentProfile, getProfileCreated } from "../../Actions/profileActions";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import { Link } from "react-router-dom";

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
        // console.log(this.state.errors);
        // var profilecreatedVar = JSON.parse(localStorage.getItem('profilecreated'));
        // if (this.props.auth.isAuthenticated) {
        //     // this.props.getProfileCreated(this.props.history, this.props.match.url);      
        //     if(!profilecreatedVar){
        //         this.props.history.push('/createprofile');
        //     }
        // }
      }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    // if(!this.props.profile) {
    //    this.props.history.push('/createprofile');
    //   }
    if (profile === null || loading) {
      if (!this.state.errors) {
        profileContent = <Loader />;
      }
      console.log(this.state.errors)
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
        {
          this.state.errors ? <div><h1 style={{ color: "red" }}><br/>{ this.state.errors.noprofile }</h1><br/><Link to="/createprofile"><h3 style={{ fontSize: "10", textAlign: "center" }} >Please Create Your Profile First</h3></Link></div> : null 
        }
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

export default connect(mapStateToProps, { getCurrentProfile, getProfileCreated })(withStyles(styles)(MyProfile));
