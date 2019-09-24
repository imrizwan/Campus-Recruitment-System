import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
// import { withStyles } from '@material-ui/core/styles';
import isEmpty from "../../validation/is-empty";
import { getCurrentProfile, getProfileCreated } from "../../Actions/profileActions";
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
// import Link from '@material-ui/core/Link';
import { Link } from "react-router-dom"
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
// import { PropTypes } from 'prop-types';
// import ProfileHeader from "./ProfileHeader";
// import ProfileAbout from "./ProfileAbout";
// import ProfileCreds from "./ProfileCreds";
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
// import Markdown from './Markdown';
// import post1 from './blog-post.1.md';
import Img from "./img.jpeg";
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/" color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

// const sections = [
//   'Technology',
//   'Design',
//   'Culture',
//   'Business',
//   'Politics',
//   'Opinion',
//   'Science',
//   'Health',
//   'Style',
//   'Travel',
// ];

// const featuredPosts = [
//   {
//     title: 'Featured post',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//   },
//   {
//     title: 'Post title',
//     date: 'Nov 11',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//   },
// ];

// const posts = [post1];

const archives = [
  'March 2020',
  'February 2020',
  'January 2020',
  'December 2019',
  'November 2019',
  'October 2019',
  'September 2019',
  'August 2019',
  'July 2019',
  'June 2019',
  'May 2019',
  'April 2019',
];

const social = ['GitHub', 'Twitter', 'Facebook'];

function MyProfile(props) {
  const classes = useStyles();

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.getCurrentProfile();
    }
  }, [])
  console.log(props)
  return (
    isEmpty(props.profile) ? <Loader /> :
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <Link to="/updateprofile">
              <Button size="small">
                Edit
            </Button>
            </Link>
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
            {/* <IconButton>
            <SearchIcon />
          </IconButton>
          <Button variant="outlined" size="small">
            Sign up
          </Button> */}
          </Toolbar>
          {/* <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          {sections.map(section => (
            <Link
              color="inherit"
              noWrap
              key={section}
              variant="body2"
              href="#"
              className={classes.toolbarLink}
            >
              {section}
            </Link>
          ))}
        </Toolbar> */}
          <main>
            {/* Main featured post */}
            <Paper className={classes.mainFeaturedPost}>
              {/* Increase the priority of the hero background image */}
              {
                <img
                  style={{ display: 'none' }}
                  src="https://source.unsplash.com/user/erondu"
                  alt="background"
                />
              }
              <div className={classes.overlay} />
              <Grid container>
                <Grid item md={6}>
                  <div className={classes.mainFeaturedPostContent}>
                    <Typography variant="h3" color="inherit" gutterBottom>
                      {props.profile.name}
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                      {props.profile.description}
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
                <Grid item md={6}>
                  <div className={classes.mainFeaturedPostContent}>
                    <img alt="profile" src={isEmpty(props.profile.url) ? <Img/> : props.profile.url}/>
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
                  posts: props.profile.skills,
                },
                {
                  title: "Interests",
                  posts: props.profile.interests
                }
              ].map((post, index) => (
                <Grid item key={index} xs={12} md={6}>
                  <CardActionArea component="a" href="#">
                    <Card className={classes.card}>
                      <div className={classes.cardDetails}>
                        <CardContent>
                          <Typography component="h2" variant="h5">
                            {post.title}
                          </Typography>
                          {/* <Typography variant="subtitle1" paragraph> */}
                          <ul variant="subtitle1">
                            {
                              post.posts.map((item, index) => (
                                <li key={index}>
                                  {item}
                                </li>
                              ))
                            }
                          </ul>
                          {/* </Typography> */}
                          {/* <Typography variant="subtitle1" color="primary">
                            Hello reading...
                        </Typography> */}
                        </CardContent>
                      </div>
                      <Hidden xsDown>
                        <CardMedia
                          className={classes.cardMedia}
                          image="https://source.unsplash.com/random"
                          title="Image title"
                        />
                      </Hidden>
                    </Card>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
            {/* End sub featured posts */}
            <Grid container spacing={5} className={classes.mainGrid}>
              {/* Main content */}
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                  From the Firehose
              </Typography>
                <Divider />
                {/* {posts.map(post => (
                <Markdown className={classes.markdown} key={post.substring(0, 40)}>
                  {post}
                </Markdown>
              ))} */}
              </Grid>
              {/* End main content */}
              {/* Sidebar */}
              <Grid item xs={12} md={4}>
                <Paper elevation={0} className={classes.sidebarAboutBox}>
                  <Typography variant="h6" gutterBottom>
                    About
                </Typography>
                  <Typography>
                    Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit
                    amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
                </Typography>
                </Paper>
                <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                  Archives
              </Typography>
                {archives.map(archive => (
                  <Link display="block" variant="body1" to="/" key={archive}>
                    {archive}
                  </Link>
                ))}
                <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                  Social
              </Typography>
                {social.map(network => (
                  <Link display="block" variant="body1" to="/" key={network}>
                    {network}
                  </Link>
                ))}
              </Grid>
              {/* End sidebar */}
            </Grid>
          </main>
        </Container>
        {/* Footer */}
        <footer className={classes.footer}>
          <Container maxWidth="lg">
            <Typography variant="h6" align="center" gutterBottom>
              Footer
          </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              Something here to give the footer a purpose!
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
  connect(mapStateToProps, { getCurrentProfile, getProfileCreated })
)(withRouter(MyProfile))

// const styles = theme => ({})

// class MyProfile extends Component {

//     state = {
//       errors: {}
//     }

//     UNSAFE_componentWillReceiveProps(nextProps) {
//         if (nextProps.errors) {
//             this.setState({ errors: nextProps.errors });
//         }
//     }

//       componentWillMount(){
//         if (this.props.auth.isAuthenticated) {
//           this.props.getCurrentProfile();
//         }
//       }

//   render() {
//     const { profile, loading } = this.props.profile;
//     let profileContent;
//         if (profile === null || loading) {
//                 return(
//                     <Loader />
//                 )
//           } else { 
//         profileContent = (
//         <div>
//             <ProfileHeader profile={profile} fullname={this.props.auth.user.fullname} />
//             <ProfileAbout profile={profile} />
//             <ProfileCreds profile={profile} />
//         </div>
//         )
//     }
//     return (
//       <div>
//           {profileContent}
//       </div>
//     );
//   }
// }

// MyProfile.propTypes = {
//     getProfileCreated: PropTypes.func.isRequired,
//     getCurrentProfile: PropTypes.func.isRequired,
//     profile: PropTypes.object.isRequired,
//     auth: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//     profile: state.profile,
//     auth: state.auth,
//     errors: state.errors,
//     profilecreated: state.profilecreated.profilecreated
// });

// // export default connect(mapStateToProps, { getCurrentProfile, getProfileCreated })(withStyles(styles)(MyProfile));
// export default compose(
//   withStyles(styles),
//   connect(mapStateToProps, { getCurrentProfile, getProfileCreated })
// )(withRouter(MyProfile))