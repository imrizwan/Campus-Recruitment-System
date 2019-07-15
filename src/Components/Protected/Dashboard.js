import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'
import Loader from "../Loader/Loader"
import isEmpty from "../../validation/is-empty"
import { getProfileCreated, getCompanies } from "../../Actions/profileActions"

class Dashboard extends Component {

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
    // incomplete logic
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
                        <div key={index2}>
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
                              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Apply</button>
                            </div>
                            <div className="card-footer text-muted text-center">
                              {this.ago(vaccancy.date)}
                            </div>
                          </div>
                          {/* Modal */}
                          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLabel">{vaccancy.position} - {vaccancy.jobtype}</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  Are you sure?
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                                  <button type="button" class="btn btn-success">Confirm</button>
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
  profilecreated: state.profilecreated.profilecreated,
  companyprofiles: state.profile.companyprofiles,
});

// export default connect(mapStateToProps)(Dashboard);
export default compose(
  connect(mapStateToProps, { getProfileCreated, getCompanies })
)(withRouter(Dashboard))