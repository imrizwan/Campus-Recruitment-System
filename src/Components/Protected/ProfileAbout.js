import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import isEmpty from "../../validation/is-empty";

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

class ProfileAbout extends Component {
    render() {
        const { profile, classes } = this.props;

        // Get first name
        //const firstName = profile.user.fullname.trim().split(' ')[0];

        // Skill List
          const skills = profile.skills.map((skill, index) => (
          <div key={index} style={{ textAlign: "left", marginLeft: 52, marginBottom: 10 }}>
               {index+1} - {skill}
          </div>
          ));
        
        return(
                <div className={classes.root}>
                <div className={classes.margin}>
                <Grid container spacing={32}>
                <Grid item className={isEmpty(profile.bio) ? classes.gridLocation: null} xs={6}>
                <Paper className={classes.paper}>
                {isEmpty(profile.bio) ? (
                <span>{profile.user.fullname} does not have a bio</span>
              ) : (
                <Typography variant="title" gutterBottom className={classes.title}><strong>Bio: </strong> {profile.bio}</Typography>
              )}
                </Paper>
                </Grid>
                <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <Typography className={classes.title} variant="title" gutterBottom><strong>Skill Set</strong>{skills}</Typography>
                  </Paper>
                </Grid>
                </Grid>
                </div>
                </div>
        )
    }
}

ProfileAbout.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ProfileAbout);