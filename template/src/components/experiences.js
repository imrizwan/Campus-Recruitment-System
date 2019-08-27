import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from './shared/section';

export default class Experiences extends Component {

myDate = (date) => {
    date = new Date(date);
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
}

  renderListItem(item, i) {
    return (
      <div className="item" key={`exp_item_${i}`}>
        <div className="meta">
          <div className="upper-row">
            <h3 className="job-title">{item.title}</h3>
            <div className="time">{`${this.myDate(item.from)} - ${item.current ? "PRESENT" : this.myDate(item.to)}`}</div>
          </div>
          {this.renderCompanySection(item.company, item.companyLink, item.companyShortDetail)}
        </div>
        <div className="details">
          <p dangerouslySetInnerHTML={{ __html: item.description }} />
        </div>
      </div>
    );
  }
  renderCompanySection(company, companyLink, companyShortDetail) {
    if (company && companyLink) {
      return (<div className="company"> <a href={companyLink} target="_blank">{company}</a> {companyShortDetail || ''}</div>);
    }
    return null;
  }
  render() {
    const { icon, sectionTitle, list, data } = this.props;
    return (
      <Section
        className="experieces-section"
        icon={icon || 'briefcase'}
        title={sectionTitle || 'Experiences'}
        id="experiences"
      >
        {data.map((item, i) => {
          return this.renderListItem(item, i);
        })}
      </Section>
    );
  }
}

Experiences.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  sectionTitle: PropTypes.string.isRequired,
  icon: PropTypes.string
};

