import React from "react";
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { createProfile, getProfileCreated } from "../Actions/profileActions";
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import compose from 'recompose/compose'
import isEmpty from "../validation/is-empty"
import Loader from "./Loader/Loader"

const styles = theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    textField: {
        width: "100%",
    },
    center: {
        margin: "0 auto",
        width: "50%"
    },
    menu: {
        width: 200,
      },
  });

  // Select options for status
  const status = [
    { label: '* Select Professional Status', value: 0 },
    { label: 'Developer', value: 'Developer' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Student or Learning', value: 'Student or Learning' },
    { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Other', value: 'Other' }
  ];

class CreateProfile extends React.Component {

    state = {
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {},
        displaySocialInputs: false,
    }

    componentDidMount(){
        
        if (this.props.auth.isAuthenticated) {
            this.props.getProfileCreated();   
            if(!isEmpty(this.props.profilecreated)){
                if(!this.props.profilecreated.profilecreated){
                    if(this.props.auth.user.userType === "student"){
                        this.props.history.push("/createprofile")
                    } else this.props.history.push("/createcompanyprofile")
                }
            }         
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    
    onClick = (e) => {
        e.preventDefault();
        const profileData = {
            username: this.props.auth.user.username,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        };
        
        this.props.createProfile(profileData, this.props.history);
    }
    
    render(){
        const { classes } = this.props;
        const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <TextField
                id="outlined-twitter-username"
                label="Twitter Profile URL"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.twitter}
                onChange={this.handleChange('twitter')}
                />
            {
                    errors.twitter ? <div style={{ color: "red" }}>{ errors.twitter }</div> : null
                }
          <TextField
                id="outlined-facebook-username"
                label="Facebook Page URL"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.facebook}
                onChange={this.handleChange('facebook')}
                />
                {
                    errors.facebook ? <div style={{ color: "red" }}>{ errors.facebook }</div> : null
                }
                <TextField
                id="outlined-linkedin-username"
                label="Linkedin Profile URL"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.linkedin}
                onChange={this.handleChange('linkedin')}
                />
                {
                    errors.linkedin ? <div style={{ color: "red" }}>{ errors.linkedin }</div> : null
                }
                <TextField
                id="outlined-youtube-username"
                label="YouTube Profile URL"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.youtube}
                onChange={this.handleChange('youtube')}
                />
                {
                    errors.youtube ? <div style={{ color: "red" }}>{ errors.youtube }</div> : null
                }
                <TextField
                id="outlined-instagram-username"
                label="Instagram Profile URL"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.instagram}
                onChange={this.handleChange('instagram')}
                />
                {
                    errors.instagram ? <div style={{ color: "red" }}>{ errors.instagram }</div> : null
                }
        </div>
      );
    } 
    if(isEmpty(this.props.profilecreated)) { return <Loader/> }
    else {
        return (
            !isEmpty(this.props.profilecreated) && this.props.profilecreated.profilecreated ?
            <div>
                <br/>
            <Typography variant="display1" className={classes.title}>You have already made profile, Go to <Link to="/updateprofile">Update Profile</Link> for Changes</Typography>
            </div>
            :
                <div>
                    <div className={classes.root}>
                    <br/>
                    <div className={classes.center}>   
                    {!isEmpty(this.props.profilecreated) && this.props.profilecreated.profilecreated ? <Typography variant="display2">Create Profile</Typography> : null}
                    {!isEmpty(this.props.profilecreated) && !this.props.profilecreated.profilecreated ? <Typography variant="display1">Create your profile first</Typography> : null}
                    <TextField
                    id="outlined-username"
                    label="Username"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.props.auth.user.username}
                    onChange={this.handleChange('username')}
                    placeholder="A unique username for your profile URL. Your full name, company name, nickname"
                    disabled
                    />
                    {
                        errors.username ? <div style={{ color: "red" }}>{ errors.username }</div> : null
                    }
                    <TextField
                    id="outlined-company"
                    label="Company"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.company}
                    onChange={this.handleChange('company')}
                    placeholder="Could be your own company or one you work for"
                    multiline
                    />
                    
                    <TextField
                        id="select-status"
                        select
                        label="Select"
                        className={classes.textField}
                        value={this.state.status}
                        onChange={this.handleChange('status')}
                        SelectProps={{
                            MenuProps: {
                            className: classes.menu,
                            },
                        }}
                        helperText="Please select your status"
                        margin="normal"
                        >
                        {status.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                        {
                            errors.status ? <div style={{ color: "red" }}>{ errors.status }</div> : null
                        }
                        <TextField
                        id="outlined-website"
                        label="Website"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.handle}
                        onChange={this.handleChange('website')}
                        placeholder="Could be your own website or a company one"
                        multiline
                        />
    
                         <TextField
                        id="outlined-location"
                        label="Location"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.handle}
                        onChange={this.handleChange('location')}
                        placeholder="City or city &amp; state suggested (eg. Karachi, Sindh)"
                        multiline
                        />
    
                         <TextField
                        id="outlined-skills"
                        label="Skills"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.handle}
                        onChange={this.handleChange('skills')}
                        placeholder="Please use comma separated values (eg.
                            HTML,CSS,JavaScript,PHP"
                        multiline
                        />
                        {
                            errors.skills ? <div style={{ color: "red" }}>{ errors.skills }</div> : null
                        }
    
                        <TextField
                        id="outlined-githubusername"
                        label="Github Username"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.githubusername}
                        onChange={this.handleChange('githubusername')}
                        placeholder="If you want your latest repos and a Github link, include your username"
                        multiline
                        />
    
                         <TextField
                        id="outlined-bio"
                        label="Short Bio"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.bio}
                        onChange={this.handleChange('bio')}
                        placeholder="Tell us a little about yourself"
                        multiline
                        />
                        <br/>
                        <br/>
                        <Button 
                        variant="contained" 
                        className={classes.button}
                        onClick={() => {
                          this.setState(prevState => ({
                            displaySocialInputs: !prevState.displaySocialInputs
                          }));
                        }}
                        >
                            Add Social Network Links
                        </Button>
                        <span>Optional</span>
                        {socialInputs}
                        <br/>
                        <br/>
                        <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={this.onClick}
                        >
                            Submit
                        </Button>
                        <br/>
                        <br/>
                    </div>
                </div>
                </div>
        )
    }
    }
}

CreateProfile.propTypes = {
    getProfileCreated: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

  const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    profilecreated: state.profilecreated.profilecreated,
  });

export default compose(
    withStyles(styles),
    connect(mapStateToProps, { createProfile, getProfileCreated })
 )(withRouter(CreateProfile))