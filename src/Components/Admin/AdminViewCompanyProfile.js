import React, { useEffect } from "react";
import { connect } from "react-redux";
import Loader from "../Loader/Loader";
// import { withStyles } from '@material-ui/core/styles';
import isEmpty from "../../validation/is-empty";
import { getProfileCreated } from "../../Actions/profileActions";
import { getCompanyProfileById } from "../../Actions/companyProfileActions";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/" color="inherit">
        Talent Pool
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/user/erondu)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  },
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0)
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  }
}));

function AdminViewCompanyProfile(props) {
  const classes = useStyles();

  useEffect(() => {
    props.getCompanyProfileById(props.match.params.id);
  }, []);
  return isEmpty(props.getcompanyprofilebyid) || isEmpty(props.profilecreated) ? (
    isEmpty(props.getcompanyprofilebyid) ? <Typography
    style={{ marginTop: 20 }}
      component="h2"
      variant="h5"
      color="inherit"
      align="center"
      noWrap
      className={classes.toolbarTitle}
    >
      User has not created his profile yet
  </Typography> :
      <Loader />
  ) : (
      props.profilecreated.profilecreated ?
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <Toolbar className={classes.toolbar}>
              {props.auth.isAuthenticated ? (
                <Link to={`/adminupdatecompanyprofile/${props.match.params.id}`} size="small">Edit</Link>
              ) : null}
              <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="center"
                noWrap
                className={classes.toolbarTitle}
              >
                Profile
          </Typography>
            </Toolbar>
            <main>
              <Paper className={classes.mainFeaturedPost}>
                {
                  <img
                    style={{ display: "none" }}
                    src="https://unsplash.com/photos/U2BI3GMnSSE"
                    alt="background"
                  />
                }
                <div className={classes.overlay} />
                <Grid container>
                  <Grid item md={9}>
                    <div className={classes.mainFeaturedPostContent}>
                      <Typography variant="h3" color="inherit" gutterBottom>
                        {props.getcompanyprofilebyid.company}
                      </Typography>
                      <Typography variant="h6" color="inherit" paragraph>
                        {props.getcompanyprofilebyid.description}
                      </Typography>
                      <Typography variant="h5" color="inherit" paragraph>
                        Company Type: {props.getcompanyprofilebyid.industrytype}
                      </Typography>
                      <Typography variant="h5" color="inherit" paragraph>
                        Location: {props.getcompanyprofilebyid.location}
                      </Typography>
                      <Typography variant="h5" color="inherit" paragraph>
                        Number of Employee:{" "}
                        {props.getcompanyprofilebyid.numberofemployee}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
              {isEmpty(props.getcompanyprofilebyid.vaccancy) ? null : (
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ marginTop: "20px", textAlign: "center" }}
                >
                  Vaccancies
            </Typography>
              )}
              <Grid container spacing={5} className={classes.mainGrid}>
                <Divider />
                {props.getcompanyprofilebyid.vaccancy.map((item, index) => (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    md={6}
                    style={{ marginBottom: 10 }}
                  >
                    <CardActionArea>
                      <Card className={classes.card}>
                        <div className={classes.cardDetails}>
                          <CardContent>
                            <Typography component="h2" variant="h5">
                              {item.position}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                              {item.jobtype}
                            </Typography>
                            <Typography variant="subtitle2" paragraph>
                              {item.degreerequired}
                            </Typography>
                            <Typography variant="subtitle2" paragraph>
                              {item.skillsrequired[0]}
                            </Typography>
                          </CardContent>
                        </div>
                      </Card>
                    </CardActionArea>
                  </Grid>
                ))}
                <Grid item xs={12} md={4}>
                  {isEmpty(props.getcompanyprofilebyid.social.youtube) ||
                    isEmpty(props.getcompanyprofilebyid.social.linkedin) ||
                    isEmpty(props.getcompanyprofilebyid.social.github) ||
                    isEmpty(props.getcompanyprofilebyid.social.twitter) ||
                    isEmpty(props.getcompanyprofilebyid.social.instagram) ||
                    isEmpty(props.getcompanyprofilebyid.social.facebook) ? null : (
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.sidebarSection}
                      >
                        Social
                </Typography>
                    )}
                  {props.getcompanyprofilebyid.social.youtube ? (
                    <a
                      target="_blank"
                      href={`//www.youtube.com/user/${props.getcompanyprofilebyid.social.youtube}`}
                      style={{ marginRight: "5px" }}
                    >
                      Youtube
                </a>
                  ) : null}
                  {props.getcompanyprofilebyid.social.twitter ? (
                    <a
                      target="_blank"
                      href={`//www.twitter.com/${props.getcompanyprofilebyid.social.twitter}`}
                      style={{ marginRight: "5px" }}
                    >
                      Twitter
                </a>
                  ) : null}
                  {props.getcompanyprofilebyid.social.facebook ? (
                    <a
                      target="_blank"
                      href={`//www.facebook.com/${props.getcompanyprofilebyid.social.facebook}`}
                      style={{ marginRight: "5px" }}
                    >
                      Facebook
                </a>
                  ) : null}
                  {props.getcompanyprofilebyid.social.linkedin ? (
                    <a
                      target="_blank"
                      href={`//www.linkedin.com/in/${props.getcompanyprofilebyid.social.linkedin}`}
                      style={{ marginRight: "5px" }}
                    >
                      Linkedin
                </a>
                  ) : null}
                  {props.getcompanyprofilebyid.social.instagram ? (
                    <a
                      target="_blank"
                      href={`//www.instagram.com/${props.getcompanyprofilebyid.social.instagram}`}
                      style={{ marginRight: "5px" }}
                    >
                      Instagram
                </a>
                  ) : null}
                  {props.getcompanyprofilebyid.social.github ? (
                    <a
                      target="_blank"
                      href={`//www.github.com/${props.getcompanyprofilebyid.social.github}`}
                      style={{ marginRight: "5px" }}
                    >
                      Github
                </a>
                  ) : null}
                </Grid>
              </Grid>
            </main>
          </Container>
          <footer className={classes.footer}>
            <Container maxWidth="lg">
              <Typography variant="h6" align="center" gutterBottom>
                {`${props.getcompanyprofilebyid.company}'s Profile`}
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
                component="p"
              >
                Made by Muhammad Rizwan
          </Typography>
              <Copyright />
            </Container>
          </footer>
        </React.Fragment> : <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          User has not created profile yet
          </Typography>
    );
}

const mapStateToProps = state => ({
  getcompanyprofilebyid: state.profile.getcompanyprofilebyid,
  auth: state.auth,
  errors: state.errors,
  profilecreated: state.profilecreated.profilecreated
});

export default compose(
  // withStyles(styles),
  connect(
    mapStateToProps,
    { getCompanyProfileById, getProfileCreated }
  )
)(withRouter(AdminViewCompanyProfile));
