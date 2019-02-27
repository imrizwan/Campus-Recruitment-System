import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import isEmpty from '../../validation/is-empty';
import "./ProfileHeader.css";

const styles = theme => ({
    root: {
      flexGrow: 1,
      paddingLeft: 20,
      paddingRight: 20
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    twitterIcon: {
        fontSize: 30,
        marginRight: 10,
        color: "#52A7E7"
      },
      facebookIcon: {
        fontSize: 30,
        marginRight: 10,
        color: "#38529A"
      },
      linkedinIcon: {
        fontSize: 30,
        marginRight: 10,
        color: "#007BB5"
      },
      youtubeIcon: {
        fontSize: 30,
        marginRight: 10,
        color: "#FF0000"
      },
      instagramIcon: {
        fontSize: 30,
        marginRight: 10,
        color: "#AB348C"
      },
      githubusernameIcon: {
        fontSize: 30,
        marginRight: 10,
        color: "#161414"
      },
      company: {
        fontSize: 30,
      }
  });

  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

class ProfileHeader extends React.Component{

    
    render(){
        const { website, description } = this.props.profile;
        // const { classes, profile } = this.props;
        console.log(this.props.profile);
        return(
        <div>
            <br/>
        <div>
            <div className="jumbotron jumbotron-fluid padding">
            <div className="container">
                <h1 className="display-4">{website}</h1>
                <p className="lead">{description}</p>
            </div>
            </div>
        </div>
        </div>
        )
    }
}

ProfileHeader.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ProfileHeader);