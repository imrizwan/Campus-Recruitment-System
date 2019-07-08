import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { withStyles } from '@material-ui/core/styles';
import { getProfileById } from "../../Actions/profileActions";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'

const styles = theme => ({})

class Profile extends Component {

    componentDidMount() {
            if (this.props.match.params.id) {
              this.props.getProfileById(this.props.match.params.id);
            }
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
          this.props.history.push('/404');
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
            <ProfileAbout profile={profile} />
            <ProfileCreds profile={profile} />
        </div>)
    }
    return (
      <div>
          {profileContent}
      </div>
    );
  }
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
});

// export default connect(mapStateToProps, { getProfileById })(withStyles(styles)(Profile));
export default compose(
  withStyles(styles),
  connect(mapStateToProps, { getProfileById })
)(withRouter(Profile))