import React, { Component } from "react";
import PropTypes from "prop-types";

export default class EducationDetails extends Component {
  myDate = date => {
    date = new Date(date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  renderListItem(item, i) {
    return (
      <div className="item" key={`education_item_${i}`}>
        <h4 className="degree">{item.degree}</h4>
        <h5 className="meta">{item.school}</h5>
        <div className="time">{`${this.myDate(item.from)} - ${item.current ? "PRESENT" : this.myDate(item.to)}`}</div>
      </div>
    );
  }
  render() {
    return (
      <div className="education-container container-block">
        <h2 className="container-block-title">
          {this.props.title || "Education"}
        </h2>
        {this.props.data.map((item, i) => {
          return this.renderListItem(item, i);
        })}
      </div>
    );
  }
}

EducationDetails.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  title: PropTypes.string.isRequired
};
