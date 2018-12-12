import React from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
    margin: {
        margin: 12,
    }
  });

class ProfileHeader extends React.Component {
    render() {
        const { classes } = this.props;
        console.log(this.props.profile);
        return(
                <div className={classes.root}>
                <div className={classes.margin}>
                <Grid container spacing={32}>
                <Grid item xs={4}>
                <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={4}>
                <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={4}>
                <Paper className={classes.paper}>xs=4</Paper>
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