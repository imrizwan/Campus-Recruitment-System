import React from "react";
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { createCompanyProfile } from "../../Actions/companyProfileActions";
import { getProfileCreated } from "../../Actions/profileActions";
import { connect } from "react-redux";

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
    { label: 'Advertising/Public Relations', value: 'Advertising/Public Relations' },
    { label: 'Aerospace', value: 'Aerospace' },
    { label: ' Defense Contractors', value: ' Defense Contractors' },
    { label: 'Agribusiness', value: 'Agribusiness' },
    { label: 'Agricultural Services & Products', value: 'Agricultural Services & Products' },
    { label: 'Agriculture', value: 'Agriculture' },
    { label: 'Air Transport', value: 'Air Transport' },
    { label: 'Air Transport Unions', value: 'Air Transport Unions' },
    { label: 'Airlines', value: 'Airlines' },
    { label: 'Alternative Energy Production & Services', value: 'Alternative Energy Production & Services' },
    { label: 'Architectural Services', value: 'Architectural Services' },
    { label: 'Attorneys/Law Firms', value: 'Attorneys/Law Firms' },
    { label: 'Auto Dealers', value: 'Auto Dealers' },
    { label: 'Auto Manufacturers', value: 'Auto Manufacturers' },
    { label: 'Automotive', value: 'Automotive' },
    { label: 'Banking', value: 'Banking' },
    { label: 'Banks', value: 'Banks' },
    { label: ' Commercial', value: ' Commercial' },
    { label: ' Savings & Loans', value: ' Savings & Loans' },
    { label: 'Bars & Restaurants', value: 'Bars & Restaurants' },
    { label: 'Books', value: 'Books' },
    { label: ' Magazines & Newspapers', value: ' Magazines & Newspapers' },
    { label: 'Broadcasters', value: 'Broadcasters' },
    { label: ' Radio/TV', value: ' Radio/TV' },
    { label: 'Builders/General Contractors', value: 'Builders/General Contractors' },
    { label: 'Builders/Residential', value: 'Builders/Residential' },
    { label: 'Building Materials & Equipment', value: 'Building Materials & Equipment' },
    { label: 'Building Trade Unions ', value: 'Building Trade Unions ' },
    { label: 'Business Associations', value: 'Business Associations' },
    { label: 'Business Services', value: 'Business Services' },
    { label: 'Cable & Satellite TV Production & Distribution', value: 'Cable & Satellite TV Production & Distribution' },
    { label: 'Candidate Committees', value: 'Candidate Committees' },
    { label: ' Democratic', value: ' Democratic' },
    { label: ' Republican', value: ' Republican' },
    { label: 'Car Dealers', value: 'Car Dealers' },
    { label: ' Imports', value: ' Imports' },
    { label: 'Car Manufacturers', value: 'Car Manufacturers' },
    { label: 'Casinos / Gambling', value: 'Casinos / Gambling' },
    { label: 'Cattle Ranchers/Livestock', value: 'Cattle Ranchers/Livestock' },
    { label: 'Chemical & Related Manufacturing', value: 'Chemical & Related Manufacturing' },
    { label: 'Civil Servants/Public Officials', value: 'Civil Servants/Public Officials' },
    { label: 'Clothing Manufacturing', value: 'Clothing Manufacturing' },
    { label: 'Colleges', value: 'Colleges' },
    { label: ' Universities & Schools', value: ' Universities & Schools' },
    { label: 'Commercial Banks', value: 'Commercial Banks' },
    { label: 'Commercial TV & Radio Stations', value: 'Commercial TV & Radio Stations' },
    { label: 'Communications/Electronics', value: 'Communications/Electronics' },
    { label: 'Computer Software', value: 'Computer Software' },
    { label: 'Conservative/Republican', value: 'Conservative/Republican' },
    { label: 'Construction', value: 'Construction' },
    { label: 'Construction Services', value: 'Construction Services' },
    { label: 'Construction Unions', value: 'Construction Unions' },
    { label: 'Crop Production & Basic Processing', value: 'Crop Production & Basic Processing' },
    { label: 'Cruise Lines', value: 'Cruise Lines' },
    { label: 'Cruise Ships & Lines', value: 'Cruise Ships & Lines' },
    { label: 'Dairy', value: 'Dairy' },
    { label: 'Defense', value: 'Defense' },
    { label: 'Defense Aerospace', value: 'Defense Aerospace' },
    { label: 'Defense Electronics', value: 'Defense Electronics' },
    { label: 'Defense/Foreign Policy Advocates', value: 'Defense/Foreign Policy Advocates' },
    { label: 'Dentists', value: 'Dentists' },
    { label: 'Doctors & Other Health Professionals', value: 'Doctors & Other Health Professionals' },
    { label: 'Drug Manufacturers', value: 'Drug Manufacturers' },
    { label: 'Education ', value: 'Education ' },
    { label: 'Electric Utilities', value: 'Electric Utilities' },
    { label: 'Electronics Manufacturing & Equipment', value: 'Electronics Manufacturing & Equipment' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Energy & Natural Resources', value: 'Energy & Natural Resources' },
    { label: 'Entertainment Industry', value: 'Entertainment Industry' },
    { label: 'Environment ', value: 'Environment ' },
    { label: 'Farm Bureaus', value: 'Farm Bureaus' },
    { label: 'Farming', value: 'Farming' },
    { label: 'Finance / Credit Companies', value: 'Finance / Credit Companies' },
    { label: 'Finance', value: 'Finance' },
    { label: ' Insurance & Real Estate', value: ' Insurance & Real Estate' },
    { label: 'Food & Beverage', value: 'Food & Beverage' },
    { label: 'Food Processing & Sales', value: 'Food Processing & Sales' },
    { label: 'Food Products Manufacturing', value: 'Food Products Manufacturing' },
    { label: 'Food Stores', value: 'Food Stores' },
    { label: 'For-profit Education', value: 'For-profit Education' },
    { label: 'For-profit Prisons', value: 'For-profit Prisons' },
    { label: 'Foreign & Defense Policy ', value: 'Foreign & Defense Policy ' },
    { label: 'Forestry & Forest Products', value: 'Forestry & Forest Products' },
    { label: 'Foundations', value: 'Foundations' },
    { label: ' Philanthropists & Non-Profits', value: ' Philanthropists & Non-Profits' },
    { label: 'Garbage Collection/Waste Management', value: 'Garbage Collection/Waste Management' },
    { label: 'Gas & Oil', value: 'Gas & Oil' },
    { label: 'General Contractors', value: 'General Contractors' },
    { label: 'Government Employees', value: 'Government Employees' },
    { label: 'Gun Control ', value: 'Gun Control ' },
    { label: 'Gun Rights ', value: 'Gun Rights ' },
    { label: 'Health', value: 'Health' },
    { label: 'Health Professionals', value: 'Health Professionals' },
    { label: 'Health Services/HMOs', value: 'Health Services/HMOs' },
    { label: 'HMOs & Health Care Services', value: 'HMOs & Health Care Services' },
    { label: 'Home Builders', value: 'Home Builders' },
    { label: 'Hospitals & Nursing Homes', value: 'Hospitals & Nursing Homes' },
    { label: 'Hotels', value: 'Hotels' },
    { label: ' Motels & Tourism', value: ' Motels & Tourism' },
    { label: 'Human Rights ', value: 'Human Rights ' },
    { label: 'Ideological/Single-Issue', value: 'Ideological/Single-Issue' },
    { label: 'Indian Gaming', value: 'Indian Gaming' },
    { label: 'Industrial Unions ', value: 'Industrial Unions ' },
    { label: 'Insurance', value: 'Insurance' },
    { label: 'Internet', value: 'Internet' },
    { label: 'Labor', value: 'Labor' },
    { label: 'Lawyers & Lobbyists', value: 'Lawyers & Lobbyists' },
    { label: 'Lawyers / Law Firms', value: 'Lawyers / Law Firms' },
    { label: 'Leadership PACs ', value: 'Leadership PACs ' },
    { label: 'Livestock', value: 'Livestock' },
    { label: 'Lobbyists', value: 'Lobbyists' },
    { label: 'Lodging / Tourism', value: 'Lodging / Tourism' },
    { label: 'Logging', value: 'Logging' },
    { label: ' Timber & Paper Mills', value: ' Timber & Paper Mills' },
    { label: 'Manufacturing', value: 'Manufacturing' },
    { label: ' Misc', value: ' Misc' },
    { label: 'Marine Transport', value: 'Marine Transport' },
    { label: 'Meat processing & products', value: 'Meat processing & products' },
    { label: 'Medical Supplies', value: 'Medical Supplies' },
    { label: 'Mining', value: 'Mining' },
    { label: 'Misc Business', value: 'Misc Business' },
    { label: 'Misc Finance', value: 'Misc Finance' },
    { label: 'Misc Manufacturing & Distributing ', value: 'Misc Manufacturing & Distributing ' },
    { label: 'Misc Unions ', value: 'Misc Unions ' },
    { label: 'Miscellaneous Defense', value: 'Miscellaneous Defense' },
    { label: 'Miscellaneous Services', value: 'Miscellaneous Services' },
    { label: 'Mortgage Bankers & Brokers', value: 'Mortgage Bankers & Brokers' },
    { label: 'Motion Picture Production & Distribution', value: 'Motion Picture Production & Distribution' },
    { label: 'Music Production', value: 'Music Production' },
    { label: 'Natural Gas Pipelines', value: 'Natural Gas Pipelines' },
    { label: 'Newspaper', value: 'Newspaper' },
    { label: ' Magazine & Book Publishing', value: ' Magazine & Book Publishing' },
    { label: 'Non-profits', value: 'Non-profits' },
    { label: ' Foundations & Philanthropists', value: ' Foundations & Philanthropists' },
    { label: 'Nurses', value: 'Nurses' },
    { label: 'Nursing Homes/Hospitals', value: 'Nursing Homes/Hospitals' },
    { label: 'Nutritional & Dietary Supplements', value: 'Nutritional & Dietary Supplements' },
    { label: 'Oil & Gas', value: 'Oil & Gas' },
    { label: 'Other', value: 'Other' },
    { label: 'Payday Lenders', value: 'Payday Lenders' },
    { label: 'Pharmaceutical Manufacturing', value: 'Pharmaceutical Manufacturing' },
    { label: 'Pharmaceuticals / Health Products', value: 'Pharmaceuticals / Health Products' },
    { label: 'Phone Companies', value: 'Phone Companies' },
    { label: 'Physicians & Other Health Professionals', value: 'Physicians & Other Health Professionals' },
    { label: 'Postal Unions', value: 'Postal Unions' },
    { label: 'Poultry & Eggs', value: 'Poultry & Eggs' },
    { label: 'Power Utilities', value: 'Power Utilities' },
    { label: 'Printing & Publishing', value: 'Printing & Publishing' },
    { label: 'Professional Sports', value: 'Professional Sports' },
    { label: ' Sports Arenas & Related Equipment & Services', value: ' Sports Arenas & Related Equipment & Services' },
    { label: 'Public Employees', value: 'Public Employees' },
    { label: 'Public Sector Unions ', value: 'Public Sector Unions ' },
    { label: 'Publishing & Printing', value: 'Publishing & Printing' },
    { label: 'Radio/TV Stations', value: 'Radio/TV Stations' },
    { label: 'Railroads', value: 'Railroads' },
    { label: 'Real Estate', value: 'Real Estate' },
    { label: 'Record Companies/Singers', value: 'Record Companies/Singers' },
    { label: 'Recorded Music & Music Production', value: 'Recorded Music & Music Production' },
    { label: 'Recreation / Live Entertainment', value: 'Recreation / Live Entertainment' },
    { label: 'Religious Organizations/Clergy', value: 'Religious Organizations/Clergy' },
    { label: 'Residential Construction', value: 'Residential Construction' },
    { label: 'Restaurants & Drinking Establishments', value: 'Restaurants & Drinking Establishments' },
    { label: 'Retail Sales', value: 'Retail Sales' },
    { label: 'Retired ', value: 'Retired ' },
    { label: 'Savings & Loans', value: 'Savings & Loans' },
    { label: 'Schools/Education', value: 'Schools/Education' },
    { label: 'Sea Transport', value: 'Sea Transport' },
    { label: 'Securities & Investment', value: 'Securities & Investment' },
    { label: 'Special Trade Contractors', value: 'Special Trade Contractors' },
    { label: 'Sports', value: 'Sports' },
    { label: ' Professional', value: ' Professional' },
    { label: 'Steel Production ', value: 'Steel Production ' },
    { label: 'Stock Brokers/Investment Industry', value: 'Stock Brokers/Investment Industry' },
    { label: 'Student Loan Companies', value: 'Student Loan Companies' },
    { label: 'Sugar Cane & Sugar Beets', value: 'Sugar Cane & Sugar Beets' },
    { label: 'Teachers Unions', value: 'Teachers Unions' },
    { label: 'Teachers/Education', value: 'Teachers/Education' },
    { label: 'Telecom Services & Equipment', value: 'Telecom Services & Equipment' },
    { label: 'Telephone Utilities', value: 'Telephone Utilities' },
    { label: 'Textiles ', value: 'Textiles ' },
    { label: 'Timber', value: 'Timber' },
    { label: ' Logging & Paper Mills', value: ' Logging & Paper Mills' },
    { label: 'Tobacco', value: 'Tobacco' },
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

    componentDidMount(){
        if (this.props.auth.isAuthenticated) {
            this.props.getProfileCreated(this.props.history, this.props.match.url);            
        }
    }

    componentWillMount() {
        let profilecreatedVar = JSON.parse(localStorage.getItem('profilecreated'));
        if (this.props.auth.isAuthenticated) {
            if(profilecreatedVar){
                this.props.history.push('/updatecompanyprofile');
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
            industrytype: this.state.industrytype,
            githubusername: this.state.githubusername,
            description: this.state.description,
            numberofemployee: this.state.numberofemployee,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        };
        console.log(profileData);
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
        return(
            <div>
                <div className={classes.root}>
                <br/>
                <div className={classes.center}>   
                <Typography variant="display2">Create Profile</Typography>
                {!JSON.parse(localStorage.getItem('profilecreated')) ? <Typography variant="display3">Create your profile first</Typography> : null}
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

CreateCompanyProfile.propTypes = {
    getProfileCreated: PropTypes.func.isRequired,
    createCompanyProfile: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

  const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    profilecreated: state.profilecreated.profilecreated,
  });

export default connect(mapStateToProps, { createCompanyProfile, getProfileCreated })(withStyles(styles)(CreateCompanyProfile));