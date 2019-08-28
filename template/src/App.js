import React, { useEffect, Component } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "./assets/theme/styles.css";
import Section from "./components/shared/section";
import Sidebar from "./components/sidebar";
import Experiences from "./components/experiences";
import Projects from "./components/projects";
import Tags from "./components/tags";
import Loader from "./Loader";
import isEmpty from "./is-empty";
// console.log(url.searchParams.get("url"));
// console.log(url.searchParams.get("id"));
// var url = url.searchParams.get("url");
// var id = url.searchParams.get("id");

export default class CV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  // 5d613602c37fed147c097860
  componentDidMount() {
    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    // http://localhost:3001/?url=http://920a05d4.ngrok.io&id=5d613602c37fed147c097860
    // fetch(`http://localhost:8080/api/user${window.location.pathname}`)
    fetch(
      `${url.searchParams.get("url")}/api/user/${url.searchParams.get("id")}`
    )
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => console.log(err));
  }

  renderExperiencesSection(data) {
    if (this.props.experiences || !isEmpty(data.experience)) {
      return <Experiences {...this.props.experiences} data={data.experience} />;
    }
    return null;
  }
  renderProjectsSection(data) {
    if (this.props.projects || !isEmpty(data.projects)) {
      return <Projects {...this.props.projects} data={data.projects} />;
    }
    return null;
  }
  renderTags(data) {
    if (this.props.tags || !isEmpty(data.skills)) {
      return <Tags {...this.props.tags} data={data.skills} />;
    }
    return null;
  }
  renderOpenSourcePart() {
    return (
      <div>
        Made By&nbsp;
        <a href="https://github.com/imrizwan" target="_blank">
          Muhammad Rizwan
        </a>
      </div>
    );
  }
  renderCareerProfile(data) {
    const { icon, sectionTitle, description } = this.props.careerProfile;
    const innerContent = (
      <div
        className="summary"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
    );
    return (
      <Section
        className="summary-section"
        icon={icon || "user"}
        title={sectionTitle || "Career Profile"}
      >
        {innerContent}
      </Section>
    );
  }

  render() {
    return isEmpty(this.state.data) ? (
      <Loader />
    ) : (
      <div className="wrapper">
        <Sidebar {...this.props.profile} data={this.state.data} />
        <div className="main-wrapper">
          {this.renderCareerProfile(this.state.data)}
          {this.renderExperiencesSection(this.state.data)}
          {this.renderProjectsSection(this.state.data)}
          {this.renderTags(this.state.data)}
          {this.renderOpenSourcePart(this.state.data)}
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
