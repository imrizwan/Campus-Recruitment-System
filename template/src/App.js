import React, { useEffect, Component } from "react";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './assets/theme/styles.css';
import Section from './components/shared/section';
import Sidebar from './components/sidebar';
import Experiences from './components/experiences';
import Projects from './components/projects';
import Tags from './components/tags';

export default class CV extends Component {

  componentDidMount(){
    fetch("http://localhost:8080/api/user/5d5faed8f8a4151c0c061ec1")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  renderExperiencesSection() {
    if (this.props.experiences) {
      return (<Experiences {...this.props.experiences} />);
    }
    return null;
  }
  renderProjectsSection() {
    if (this.props.projects) {
      return (<Projects {...this.props.projects} />);
    }
    return null;
  }
  renderTags() {
    if (this.props.tags) {
      return (<Tags {...this.props.tags} />);
    }
    return null;
  }
  renderOpenSourcePart() {
    return (<div>You can create your own CV like this, <a href="https://github.com/sbayd/react-cv-template" target="_blank">access to the source code.</a></div>);
  }     
  renderCareerProfile() {
    const { icon, sectionTitle, description } = this.props.careerProfile;
    const innerContent = (<div className="summary" dangerouslySetInnerHTML={{ __html: description }} />);
    return (
      <Section
        className="summary-section"
        icon={icon || 'user'}
        title={sectionTitle || 'Career Profile'}
      >
        {innerContent}
      </Section>
    );
  }

  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props.profile}
        />
        <div className="main-wrapper">
          {this.renderCareerProfile()}
          {this.renderExperiencesSection()}
          {this.renderProjectsSection()}
          {this.renderTags()}
          {this.renderOpenSourcePart()}
        </div>
      </div>
    );
  }
}

CV.propTypes = {
  profile: PropTypes.shape().isRequired,
  careerProfile: PropTypes.shape().isRequired,
  experiences: PropTypes.shape().isRequired,
  projects: PropTypes.shape().isRequired,
  tags: PropTypes.shape().isRequired
};
