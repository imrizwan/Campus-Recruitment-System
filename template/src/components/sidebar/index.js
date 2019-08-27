import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileContainer from './profileContainer';
import ContactDetails from './contactDetails';
import EducationDetails from './educationDetails';
import LanguageDetails from './languageDetails';
import Interests from './interests';

export default class Sidebar extends Component {
  renderInterests(props) {
    if (this.props.interests) {
      return (<Interests data={props.interests} list={this.props.interests.list} title={this.props.interests.sectionTitle} />);
    }
    return null;
  }
  renderLanguages(props) {
    if (this.props.languages || !isEmpty(props.language)) {
      return (<LanguageDetails data={props.language} list={this.props.languages.list} title={this.props.languages.sectionTitle} />);
    }
    return null;
  }
  renderEducationDetails(props) {
    if (this.props.educationDetails || !isEmpty(props.education)) {
      return (<EducationDetails data={props.education} list={this.props.educationDetails.list} title={this.props.educationDetails.sectionTitle} />);
    }
    return null;
  }

  renderProfileContainer(props) {
    return (<ProfileContainer
      name={props.name}
      title={props.title}
      imagePath={this.props.imagePath}
    />);
  }

  renderContactDetails(props) {
    return (<ContactDetails
      mail={props.mail}
      phoneNumber={props.phoneNumber}
      website={props.website}
      linkedin={props.social.linkedin}
      github={props.social.github}
      title={props.title}
      twitter={props.social.twitter}
      facebook={props.social.facebook}
      youtube={props.social.youtube}
      instagram={props.social.instagram}
    />);
  }

  render() {
    return (
      <div className="sidebar-wrapper">
        {this.renderProfileContainer(this.props.data)}
        {this.renderContactDetails(this.props.data)}
        {this.renderEducationDetails(this.props.data)}
        {this.renderLanguages(this.props.data)}
        {this.renderInterests(this.props.data)}
      </div>
    );
  }
}

Sidebar.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imagePath: PropTypes.string,
  mail: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  website: PropTypes.string,
  linkedin: PropTypes.string,
  github: PropTypes.string,
  twitter: PropTypes.string,
  educationDetails: PropTypes.shape().isRequired,
  languages: PropTypes.shape().isRequired,
  interests: PropTypes.shape().isRequired,
};

Sidebar.defaultProps = {
  imagePath: null,
  phoneNumber: null,
  website: null,
  linkedin: null,
  github: null,
  twitter: null
};
