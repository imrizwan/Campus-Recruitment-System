import React from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import isEmpty from "../../validation/is-empty";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginRight: 0
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    paperSocial: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    paper2: {
      paddingBottom: theme.spacing.unit * 1.2,
      paddingTop: theme.spacing.unit * 1.2,
      paddingLeft: theme.spacing.unit * 1,
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    margin: {
        margin: 12,
    },
    gridLocation: {
      display: "none"
    },
    font: {
      fontSize: 12,
    },
    twitterIcon: {
      fontSize: 32,
      marginRight: 10
    },
    facebookIcon: {
      fontSize: 32,
      marginRight: 10
    },
    linkedinIcon: {
      fontSize: 32,
      marginRight: 10
    },
    youtubeIcon: {
      fontSize: 32,
      marginRight: 10
    },
    instagramIcon: {
      fontSize: 32,
      marginRight: 10
    },
    title: {
      whiteSpace: 'normal',
      wordWrap: 'break-word'
    }
  });

class ProfileHeader extends React.Component {
  render() {
        const { classes } = this.props;
        const { profile } = this.props;
        return(
                <div className={classes.root}>
                <div className={classes.margin}>
                <Grid container spacing={32}>
                <Grid item xs={4}>
                <Paper className={classes.paper}><Typography variant="title" gutterBottom className={classes.title}>{this.props.fullname}</Typography></Paper>
                </Grid>
                <Grid item className={isEmpty(profile.company) ? classes.gridLocation: null} xs={4}>
                <Paper className={classes.paper}>{isEmpty(profile.company) ? null : (
                  <Typography className={classes.title} variant="title" gutterBottom>{profile.company}</Typography>
                )}</Paper>
                </Grid>
                
                <Grid item className={isEmpty(profile.social) ? classes.gridLocation: null} xs={4}>
                <Paper className={classes.paperSocial}>
                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                  >
                    <FontAwesomeIcon className={classes.twitterIcon} icon={['fab', 'twitter']} />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    href={profile.social.facebook}
                    target="_blank"
                  >
                    <FontAwesomeIcon className={classes.facebookIcon} icon={['fab', 'facebook']} />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                  >
                    <FontAwesomeIcon className={classes.linkedinIcon} icon={['fab', 'linkedin']} />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    href={profile.social.youtube}
                    target="_blank"
                  >
                    <FontAwesomeIcon className={classes.youtubeIcon} icon={['fab', 'youtube']} />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    href={profile.social.instagram}
                    target="_blank"
                  >
                    <FontAwesomeIcon className={classes.instagramIcon} icon={['fab', 'instagram']} />
                  </a>
                )}
                </Paper>
                </Grid>
                <Grid item className={isEmpty(profile.website) && isEmpty(profile.location) ? classes.gridLocation: null} xs={12}>
                <Paper className={classes.paper2}>
                {isEmpty(profile.location) ? null : (
                  <Typography className={classes.font} gutterBottom><strong>Location: </strong> {profile.location}</Typography>
                )}

                {isEmpty(profile.website) ? null : (
                  <Typography className={classes.font} gutterBottom><strong>Website: </strong><a href={profile.website} target="_blank">{profile.website}</a></Typography>
                )}
                </Paper>
                </Grid>
                </Grid>
                </div>
                </div>
        )
    }
}

ProfileHeader.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ProfileHeader);