import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom';
import isEmpty from "../../validation/is-empty"
import Loader from "../Loader/Loader"
import "./index.css"
import { getProfileCreated, getCurrentCompanyProfile, deleteVaccancy } from '../../Actions/companyProfileActions';

class CompanyDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getCurrentCompanyProfile();
    }

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/signin');
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

  apply = (vaccancy) => {
    this.props.deleteVaccancy(vaccancy._id)
    window.location.reload();
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
        if ((date.getFullYear() - created.getFullYear()) === 0) {
          return `1 year ago`
        } else return `${date.getFullYear() - created.getFullYear()} years ago`
      } else if (date.getDate() !== created.getDate() && date.getMonth() === created.getMonth() && date.getDate() !== created.getDate() && date.getFullYear() === created.getFullYear()) {
        if ((date.getMonth() - created.getMonth()) === 0) {
          return `1 month ago`
        } else return `${date.getMonth() - created.getMonth()} months ago`
      } else {
        if ((date.getDate() - created.getDate()) === 0) {
          return `1 day ago`
        } else return `${date.getDate() - created.getDate()} days ago`
      }
    }
  }

  render() {
    if (isEmpty(this.props.profilecreated) || isEmpty(this.props.companyprofiles) || isEmpty(this.props.companyprofiles.profile)) { return <Loader /> }
    else {
      return (
        <div className="container">
          <br />
          <h1>Your Vaccancies</h1>
          <br />
          {
            !isEmpty(this.props.companyprofiles) ?
              <div>
                {this.props.companyprofiles.profile.vaccancy.map((vaccancy, index) => {
                  return (
                    <div key={index} className="marginBottom">
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
                          <div className="btn btn-info margin">Edit</div>
                          <div className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => this.setState({ data: vaccancy })}>Delete</div>
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
                                    this.state.errors.deletevaccany ? <div style={{ color: "red" }}>{this.state.errors.deletevaccany}</div> : "Are you sure?"
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
              : <h4 className="text-center">No vaccancy</h4>
          }
          <br />
        </div>
      );
    }
  }
}

CompanyDashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  companyprofiles: state.profile,
  auth: state.auth,
  profilecreated: state.profilecreated.profilecreated,
});

// export default connect(mapStateToProps)(CompanyDashboard);
export default compose(
  connect(mapStateToProps, { getProfileCreated, getCurrentCompanyProfile, deleteVaccancy })
)(withRouter(CompanyDashboard))