import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEmpty from '../../validation/is-empty';

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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

class ProfileHeader extends React.Component{

    
    render(){
        const { company, website, social, githubusername } = this.props.profile;
        const { classes, profile } = this.props;
        console.log(this.props.profile);
        return(
        <div className={classes.root}>
        <br/>
        <Grid container spacing={24}>
            <Grid item xs={7}>
                <Paper className={classes.paper+" "+classes.company}>{capitalizeFirstLetter(company)}</Paper>
            </Grid>
            <Grid item xs={5}>
                <Paper className={classes.paper}>
                {isEmpty(profile.website && website) ? null : (
                  <a
                    href={"//"+website}
                    target="_blank"
                  >
                    <FontAwesomeIcon className={classes.twitterIcon} icon={['fas', 'globe']} />
                  </a>
                )}
                {isEmpty(profile.social.facebook && social.facebook) ? null : (
                  <a
                    href={"//"+social.facebook}
                    target="_blank"
                  >
                    <FontAwesomeIcon className={classes.facebookIcon} icon={['fab', 'facebook']} />
                  </a>
                )}
                {isEmpty(profile.social.twitter && social.twitter) ? null : (
                  <a
                    href={"//"+social.twitter}
                    target="_blank"
                  >
                    <FontAwesomeIcon className={classes.twitterIcon} icon={['fab', 'twitter']} />
                  </a>
                )}
                {isEmpty(profile.social.instagram && social.instagram) ? null : (
                  <a
                    href={"//"+social.instagram}
                    target="_blank"
                  >
                    <FontAwesomeIcon className={classes.instagramIcon} icon={['fab', 'instagram']} />
                  </a>
                )}
                {isEmpty(profile.social.linkedin && social.linkedin) ? null : (
                  <a
                    href={"//"+social.linkedin}
                    target="_blank"
                  >
                    <FontAwesomeIcon className={classes.linkedinIcon} icon={['fab', 'linkedin']} />
                  </a>
                )}
                {isEmpty(profile.social.youtube && social.youtube) ? null : (
                  <a
                    href={"//"+social.youtube}
                    target="_blank"
                  >
                    <FontAwesomeIcon className={classes.youtubeIcon} icon={['fab', 'youtube']} />
                  </a>
                )}
                {isEmpty(profile.githubusername && githubusername) ? null : (
                  <a
                    href={"//www.github.com/"+githubusername}
                    target="_blank"
                  >
                    <FontAwesomeIcon className={classes.githubusernameIcon} icon={['fab', 'github']} />
                  </a>
                )}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>{capitalizeFirstLetter(company)}</Paper>
            </Grid>
        </Grid>
        </div>
        )
    }
}

ProfileHeader.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ProfileHeader);