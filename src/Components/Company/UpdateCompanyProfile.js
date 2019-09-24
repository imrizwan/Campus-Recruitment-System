import React from "react";
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { createCompanyProfile, getCurrentCompanyProfile  } from "../../Actions/companyProfileActions";
import { getProfileCreated } from "../../Actions/profileActions";
import { connect } from "react-redux";
import Loader from '../Loader/Loader';
import isEmpty from '../../validation/is-empty';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose'

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
  const numberofemployee = [
    { label: '* Select Number of Employee', value: 0 },
    { label: '0 - 10', value: '0 - 10' },
    { label: '10 - 100', value: '10 - 100' },
    { label: '100-1000', value: '100 - 1000' },
    { label: '1000+', value: '1000+' }
  ]

  const industrytype = [
    { label: '* Select Professional Status', value: 0 },
    { label: 'Transportation', value: 'Transportation' },
    { label: 'Transportation Unions ', value: 'Transportation Unions ' },
    { label: 'Trash Collection/Waste Management', value: 'Trash Collection/Waste Management' },
    { label: 'Trucking', value: 'Trucking' },
    { label: 'TV / Movies / Music', value: 'TV / Movies / Music' },
    { label: 'TV Production', value: 'TV Production' },
    { label: ' Airline', value: ' Airline' },
    { label: ' Building Trades', value: ' Building Trades' },
    { label: ' Industrial', value: ' Industrial' },
    { label: ' Public Sector', value: ' Public Sector' },
    { label: 'Unions', value: 'Unions' },
    { label: ' Teacher', value: ' Teacher' },
    { label: ' Transportation', value: ' Transportation' },
    { label: 'Universities', value: 'Universities' },
    { label: ' Colleges & Schools', value: ' Colleges & Schools' },
    { label: 'Vegetables & Fruits', value: 'Vegetables & Fruits' },
    { label: 'Venture Capital', value: 'Venture Capital' },
  ];

class CreateCompanyProfile extends React.Component {

      state = {
        company: '',
        website: '',
        location: '',
        industrytype: '',
        githubusername: '',
        description: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        numberofemployee: '',
        errors: {},
        displaySocialInputs: false,
    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        // when componentWillReceiveProps
        if (nextProps.profile.profile) {
            // we are gonna check the profile
            const profile = nextProps.profile.profile;
            
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.industrytype = !isEmpty(profile.industrytype) ? profile.industrytype : '';
            profile.description = !isEmpty(profile.description) ? profile.description : '';
            profile.numberofemployee = !isEmpty(profile.numberofemployee) ? profile.numberofemployee : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
        
            // set State for field form

            this.setState({ 
                username: profile.username,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                githubusername: profile.githubusername,
                numberofemployee: profile.numberofemployee,
                industrytype: profile.industrytype,
                description: profile.description,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram,
             });
        }
    }

    componentDidMount() {
        //its gonna fetch the profile
        if (this.props.auth.isAuthenticated) {
          this.props.getCurrentCompanyProfile();
        }

        if (this.props.auth.isAuthenticated) {
            this.props.getProfileCreated();
            if (!isEmpty(this.props.profilecreated)) {
              if (!this.props.profilecreated.profilecreated) {
                if (this.props.auth.user.userType === "student") {
                  this.props.history.push("/createprofile")
                } else this.props.history.push("/createcompanyprofile")
              }
            }
          }
      }

    //   componentWillMount(){
        
    //     var profilecreatedVar = JSON.parse(localStorage.getItem('profilecreated'));
    //     if (this.props.auth.isAuthenticated) {
    //         // this.props.getProfileCreated(this.props.history, this.props.match.url);      
    //         if(!profilecreatedVar){
    //             this.props.history.push('/createcompanyprofile');
    //         }
    //     }

    //   }
    
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    
    onClick = (e) => {
        e.preventDefault();
        const profileData = {
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            industrytype: this.state.industrytype,
            numberofemployee: this.state.numberofemployee,
            githubusername: this.state.githubusername,
            description: this.state.description,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };
        
        this.props.createCompanyProfile(profileData, this.props.history);
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
        const { profile, loading } = this.props.profile;
        if (profile === null || loading || isEmpty(this.props.profilecreated)) {
                return(
                    <Loader />
                )
          } else { 
        return(
            <div>
                <div className={classes.root}>
                <br/>
                <div className={classes.center}>   
                <Typography variant="h3" style={{ textAlign: "center" }}>Update Profile</Typography>

                <TextField
                id="outlined-username"
                label="Username"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.props.auth.user.username}
                disabled
                />
                
                <TextField
                id="outlined-company"
                label="Company"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.company}
                onChange={this.handleChange('company')}
                placeholder="Name of your company"
                multiline
                />
                {
                    errors.company ? <div style={{ color: "red" }}>{ errors.company }</div> : null
                }
                <TextField
                    id="select-industry-type"
                    select
                    label="Select Type of Your Company"
                    className={classes.textField}
                    value={this.state.industrytype}
                    onChange={this.handleChange('industrytype')}
                    SelectProps={{
                        MenuProps: {
                        className: classes.menu,
                        },
                    }}
                    helperText="Please select your industry type"
                    margin="normal"
                    >
                    {industrytype.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                    {
                        errors.industrytype ? <div style={{ color: "red" }}>{ errors.industrytype }</div> : null
                    }

                    <TextField
                    id="select-numberofemployee"
                    select
                    label="Select Number of Employees"
                    className={classes.textField}
                    value={this.state.numberofemployee}
                    onChange={this.handleChange('numberofemployee')}
                    SelectProps={{
                        MenuProps: {
                        className: classes.menu,
                        },
                    }}
                    helperText="Please select the estimated number of employees in your company"
                    margin="normal"
                    >
                    {numberofemployee.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                    {
                        errors.numberofemployee ? <div style={{ color: "red" }}>{ errors.numberofemployee }</div> : null
                    }

                    <TextField
                    id="outlined-website"
                    label="Website"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.website}
                    onChange={this.handleChange('website')}
                    placeholder="Website of Company"
                    multiline
                    />
                    {
                        errors.website ? <div style={{ color: "red" }}>{ errors.website }</div> : null
                    }
                     <TextField
                    id="outlined-location"
                    label="Location"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.location}
                    onChange={this.handleChange('location')}
                    placeholder="City or city &amp; state suggested (eg. Karachi, Sindh)"
                    multiline
                    />
                    {
                        errors.location ? <div style={{ color: "red" }}>{ errors.location }</div> : null
                    }

                    <TextField
                    id="outlined-githubusername"
                    label="Github Username"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.githubusername}
                    onChange={this.handleChange('githubusername')}
                    placeholder="If you are a tech company please provide your github username"
                    multiline
                    />
                    <TextField
                    id="outlined-description"
                    label="Description"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    placeholder="Description"
                    rowsMax="4"
                    multiline
                    />
                    <br/>
                    {
                        errors.description ? <div style={{ color: "red" }}>{ errors.description }</div> : null
                    }
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

CreateCompanyProfile.propTypes = {
    getProfileCreated: PropTypes.func.isRequired,
    getCurrentCompanyProfile: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

  const mapStateToProps = state => ({
    errors: state.errors,
    //we will access the profile throughout the component
    profile: state.profile,
    auth: state.auth,
    profilecreated: state.profilecreated.profilecreated,
  });

// and then we are getting current profile
// export default connect(mapStateToProps, { createCompanyProfile, getCurrentCompanyProfile, getProfileCreated })(withStyles(styles)(CreateCompanyProfile));
export default compose(
    withStyles(styles),
    connect(mapStateToProps, { createCompanyProfile, getCurrentCompanyProfile, getProfileCreated })
  )(withRouter(CreateCompanyProfile))