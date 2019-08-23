import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'
import Loader from "../Loader/Loader"
import isEmpty from "../../validation/is-empty"
import { getProfileCreated, getCompanies, applyForVaccancy } from "../../Actions/profileActions"
import "./Dashboard.css"

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {}
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/signin');
    }



    if (this.props.auth.isAuthenticated) {
      this.props.getProfileCreated();
      this.props.getCompanies();
      if (!isEmpty(this.props.profilecreated)) {
        if (!this.props.profilecreated.profilecreated) {
          // if(this.props.auth.user.userType === "student"){
          //     this.props.history.push("/createprofile")
          // } else this.props.history.push("/createcompanyprofile")
        }
      }
    }
  }
  ago = (created) => {
    let date = new Date();
    let TodaysDate = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`
    created = new Date(created)
    let createdDate = `${created.getDate()} ${created.getMonth()} ${created.getFullYear()}`
    if (TodaysDate === createdDate) {
      return "Published Today"
    } else {
      if (date.getDate() === created.getDate() && date.getMonth() === created.getMonth() && date.getDate() === created.getDate() && date.getFullYear() !== created.getFullYear()) {
        if ((date.getFullYear() - created.getFullYear()) <= 1) {
          return `${date.getFullYear() - created.getFullYear()} year ago`
        } else return `${date.getFullYear() - created.getFullYear()} years ago`
      } else if (date.getDate() !== created.getDate() && date.getMonth() === created.getMonth() && date.getDate() !== created.getDate() && date.getFullYear() === created.getFullYear()) {
        if ((date.getMonth() - created.getMonth()) <= 1) {
          return `${date.getMonth() - created.getMonth()} month ago`
        } else return `${date.getMonth() - created.getMonth()} months ago`
      } else {
        if ((date.getDate() - created.getDate()) <= 1) {
          return `${date.getDate() - created.getDate()} day ago`
        } else return `${date.getDate() - created.getDate()} days ago`
      }
    }
  }
  // skillsSplit = (skills) => {
  //   let skillsTemp;
  //   skillsTemp = skills[0].split(',')

  // }

  apply = (vaccancy) => {
    this.props.applyForVaccancy(vaccancy)
    window.location.reload();
  }

  render() {
    if (isEmpty(this.props.profilecreated) && isEmpty(this.props.companyprofiles)) { return <Loader /> } else {
      return (
        <div className="container">
          <br />
          {
            !isEmpty(this.props.companyprofiles) ?
              this.props.companyprofiles.map((profile, index1) => {
                return (
                  <div key={index1}>
                    {profile.vaccancy.map((vaccancy, index2) => {
                      return (
                        <div key={index2} className="marginBottom">
                          <div className="card text-justify">
                            <div className="card-header">
                              {vaccancy.position}
                            </div>
                            <div className="card-body">
                              <h5 className="card-title">
                                Skills Required
                              </h5>
                              <ul className="card-text ">
                                {
                                  vaccancy.skillsrequired[0].split(",").map((skills, index3) => <li key={index3}>{skills}</li>)
                                }
                              </ul>
                              <p className="card-text">
                                {vaccancy.description}
                              </p>
                              <h5 className="card-title">
                                {`${vaccancy.degreerequired.replace(',', '/')} required`}
                              </h5>
                              <h5 className="card-title">
                                {`Job Type: ${vaccancy.jobtype}`}
                              </h5>
                              {
                                !isEmpty(this.props.profilecreated) ?
                                  !this.props.profilecreated.applied.find(data => data.key === `${this.props.auth.user.id}${vaccancy._id}${vaccancy.user}`) ?
                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => this.setState({ data: vaccancy })}>Apply</button> :
                                    <button type="button" className="btn btn-success" disabled>Applied</button>
                                  : null
                              }
                            </div>
                            <div className="card-footer text-muted text-center">
                              {this.ago(vaccancy.date)}
                            </div>
                          </div>
                          {/* Modal */}
                          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="exampleModalLabel">{vaccancy.position} - {vaccancy.jobtype}</h5>
                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  {
                                    this.state.errors.applyforvaccancy ? <div style={{ color: "red" }}>{this.state.errors.applyforvaccancy}</div> : "Are you sure?"
                                  }
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                                  <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => this.apply(this.state.data)}>Confirm</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Modal End */}
                        </div>
                      )
                    })}
                  </div>
                )
              })
              : <h4 className="text-center">No vaccancy</h4>
          }
          <br />
        </div>
      );
    }
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getProfileCreated: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profilecreated: state.profilecreated.profilecreated,
  companyprofiles: state.profile.companyprofiles,
});

// export default connect(mapStateToProps)(Dashboard);
export default compose(
  connect(mapStateToProps, { getProfileCreated, getCompanies, applyForVaccancy })
)(withRouter(Dashboard))