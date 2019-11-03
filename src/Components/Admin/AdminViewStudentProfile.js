import React, { useEffect } from "react";
import { connect } from "react-redux";
import Loader from "../Loader/Loader";
// import { withStyles } from '@material-ui/core/styles';
import isEmpty from "../../validation/is-empty";
import {
  getProfileById,
  getProfileCreated
} from "../../Actions/profileActions";
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
import Img from "../../assets/noimg.png";

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

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function AdminViewStudentProfile(props) {
  const classes = useStyles();

  const getDate = date => {
    date = new Date(date);
    return `${date.getDate()}/${
      monthNames[date.getMonth()]
      }/${date.getFullYear()}`;
  };

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      // props.getProfileById();
      props.getProfileById(props.match.params.id);
    }
  }, []);
  return isEmpty(props.profile) ? (
    isEmpty(props.profile) ? <Typography
      component="h2"
      variant="h5"
      color="inherit"
      align="center"
      noWrap
      style={{ marginTop: 20 }}
      className={classes.toolbarTitle}
    >
      User has not created his profile yet
  </Typography> :
      <Loader />
  ) : (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <Link to={`/adminupdatestudentprofile/${props.match.params.id}`} size="small">Edit</Link>
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
                  src="https://source.unsplash.com/user/erondu"
                  alt="background"
                />
              }
              <div className={classes.overlay} />
              <Grid container>
                <Grid item md={9}>
                  <div className={classes.mainFeaturedPostContent}>
                    <Typography variant="h3" color="inherit" gutterBottom>
                      {props.profile.name}
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                      {props.profile.title}
                    </Typography>
                    <Typography variant="subtitle1" color="inherit">
                      {props.profile.location}
                    </Typography>
                    <Typography variant="subtitle1" color="inherit">
                      {props.profile.mail}
                    </Typography>
                    <Typography variant="subtitle1" color="inherit">
                      {props.profile.phoneNumber}
                    </Typography>
                    <Typography variant="subtitle1" color="inherit">
                      {props.profile.website}
                    </Typography>
                    <Typography variant="subtitle1" color="inherit">
                      {props.profile.batch}
                    </Typography>
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className={classes.mainFeaturedPostContent}>
                    <img
                      style={{
                        width: 150,
                        height: 150,
                        border: "2px solid black"
                      }}
                      alt="profile"
                      src={isEmpty(props.profile.url) ? Img : props.profile.url}
                    />
                  </div>
                </Grid>
              </Grid>
            </Paper>
            {/* End main featured post */}
            {/* Sub featured posts */}
            <Grid container spacing={4} className={classes.cardGrid}>
              {[
                {
                  title: "Skills",
                  posts: props.profile.skills
                },
                {
                  title: "Interests",
                  posts: props.profile.interests
                }
              ].map((post, index) => (
                <Grid item key={index} xs={12} md={6}>
                  <CardActionArea>
                    <Card className={classes.card}>
                      <div className={classes.cardDetails}>
                        <CardContent>
                          <Typography component="h2" variant="h5">
                            {post.title}
                          </Typography>
                          <ul variant="subtitle1">
                            {post.posts.map((item, index1) => (
                              <li key={index1}>{item}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </div>
                    </Card>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
            {/* End sub featured posts */}
            <Grid container spacing={5} className={classes.mainGrid}>
              {/* Main content */}
              <Grid item xs={12} md={8}>
                {isEmpty(props.profile.experience) ? null : (
                  <Typography variant="h6" gutterBottom>
                    Experience
                </Typography>
                )}
                <Divider />
                {props.profile.experience.map((item, index) => (
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
                              {item.title}
                            </Typography>
                            {item.companyShortDetail ? (
                              <Typography variant="subtitle1" paragraph>
                                {item.companyShortDetail}
                              </Typography>
                            ) : null}
                            {item.description ? (
                              <Typography variant="subtitle1" paragraph>
                                {item.description}
                              </Typography>
                            ) : null}
                            <Typography variant="subtitle2" paragraph>
                              {getDate(item.from)} -{" "}
                              {item.current ? "PRESENT" : getDate(item.to)}
                            </Typography>

                            {item.companyLink ? (
                              <a href={`//${item.companyLink}`}>{item.company}</a>
                            ) : (
                                <Typography variant="subtitle1" paragraph>
                                  {item.company}
                                </Typography>
                              )}
                            {/* <Typography variant="subtitle1" color="primary">
                            Hello reading...
                        </Typography> */}
                          </CardContent>
                        </div>
                        {/* <Hidden xsDown>
                        <CardMedia
                          className={classes.cardMedia}
                          image="https://source.unsplash.com/random"
                          title="Image title"
                        />
                      </Hidden> */}
                      </Card>
                    </CardActionArea>
                  </Grid>
                ))}
                {isEmpty(props.profile.education) ? null : (
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: "20px" }}
                  >
                    Education
                </Typography>
                )}
                <Divider />
                {props.profile.education.map((item, index) => (
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
                              {item.school}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                              {item.degree}
                            </Typography>
                            <Typography variant="subtitle2" paragraph>
                              {getDate(item.from)} -{" "}
                              {item.current ? "PRESENT" : getDate(item.to)}
                            </Typography>
                          </CardContent>
                        </div>
                        {/* <Hidden xsDown>
                        <CardMedia
                          className={classes.cardMedia}
                          image="https://source.unsplash.com/random"
                          title="Image title"
                        />
                      </Hidden> */}
                      </Card>
                    </CardActionArea>
                  </Grid>
                ))}
                {isEmpty(props.profile.projects) ? null : (
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: "20px" }}
                  >
                    Projects
                </Typography>
                )}
                <Divider />
                {props.profile.projects.map((item, index) => (
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
                              {item.name}
                            </Typography>
                            <br />
                            {item.list.map((list, index1) => (
                              <ul variant="subtitle1" key={index1}>
                                {list.url ? (
                                  <li>
                                    <a href={`//${list.url}`}>{list.title}</a>
                                    <br />
                                    {list.description
                                      ? `${list.description}`
                                      : null}
                                  </li>
                                ) : (
                                    <li>
                                      <p>{list.title}</p>
                                      <br />
                                      {list.description
                                        ? `${list.description}`
                                        : null}
                                    </li>
                                  )}
                              </ul>
                            ))}
                          </CardContent>
                        </div>
                        {/* <Hidden xsDown>
                        <CardMedia
                          className={classes.cardMedia}
                          image="https://source.unsplash.com/random"
                          title="Image title"
                        />
                      </Hidden> */}
                      </Card>
                    </CardActionArea>
                  </Grid>
                ))}
                {isEmpty(props.profile.activities) ? null : (
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginTop: "20px" }}
                  >
                    Extra Curricular Activities
                </Typography>
                )}
                <Divider />
                {props.profile.activities.map((item, index) => (
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
                              {item.title}
                            </Typography>
                            <Typography component="subtitle2" paragraph>
                              {item.description}
                            </Typography>
                          </CardContent>
                        </div>
                        {/* <Hidden xsDown>
                        <CardMedia
                          className={classes.cardMedia}
                          image="https://source.unsplash.com/random"
                          title="Image title"
                        />
                      </Hidden> */}
                      </Card>
                    </CardActionArea>
                  </Grid>
                ))}
              </Grid>
              {/* End main content */}
              {/* Sidebar */}
              <Grid item xs={12} md={4}>
                <Paper elevation={0} className={classes.sidebarAboutBox}>
                  <Typography variant="h6" gutterBottom>
                    About
                </Typography>
                  <Typography>{props.profile.description}</Typography>
                </Paper>
                {isEmpty(props.profile.language) ? null : (
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.sidebarSection}
                  >
                    Languages
                </Typography>
                )}
                {props.profile.language.map(lan => (
                  <p display="block" variant="body1" to="/" key={lan._id}>
                    {lan.name} - {lan.level}
                  </p>
                ))}
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.sidebarSection}
                >
                  Social
              </Typography>
                {props.profile.social.youtube ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`//www.youtube.com/user/${props.profile.social.youtube}`}
                    style={{ marginRight: "5px" }}
                  >
                    Youtube
                </a>
                ) : null}
                {props.profile.social.twitter ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`//www.twitter.com/${props.profile.social.twitter}`}
                    style={{ marginRight: "5px" }}
                  >
                    Twitter
                </a>
                ) : null}
                {props.profile.social.facebook ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`//www.facebook.com/${props.profile.social.facebook}`}
                    style={{ marginRight: "5px" }}
                  >
                    Facebook
                </a>
                ) : null}
                {props.profile.social.linkedin ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`//www.linkedin.com/in/${props.profile.social.linkedin}`}
                    style={{ marginRight: "5px" }}
                  >
                    Linkedin
                </a>
                ) : null}
                {props.profile.social.instagram ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`//www.instagram.com/${props.profile.social.instagram}`}
                    style={{ marginRight: "5px" }}
                  >
                    Instagram
                </a>
                ) : null}
                {props.profile.social.github ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`//www.github.com/${props.profile.social.github}`}
                    style={{ marginRight: "5px" }}
                  >
                    Github
                </a>
                ) : null}
              </Grid>
              {/* End sidebar */}
            </Grid>
          </main>
        </Container>
        {/* Footer */}
        <footer className={classes.footer}>
          <Container maxWidth="lg">
            <Typography variant="h6" align="center" gutterBottom>
              {`${props.profile.name}'s Profile`}
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
        {/* End footer */}
      </React.Fragment>
    );
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  auth: state.auth,
  errors: state.errors,
  profilecreated: state.profilecreated.profilecreated
});

export default compose(
  // withStyles(styles),
  connect(
    mapStateToProps,
    { getProfileById, getProfileCreated }
  )
)(withRouter(AdminViewStudentProfile));
