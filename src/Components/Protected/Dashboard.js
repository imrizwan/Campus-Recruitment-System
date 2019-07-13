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
    if(TodaysDate === createdDate){
      return "Published Today"
    } else {
      if(TodaysDate !== createdDate){
        return `${date.getFullYear() - created.getFullYear()} year ago`
      } else if(`${date.getMonth()} ${date.getFullYear()}` === `${created.getMonth()} ${created.getFullYear()}`){
        return `${date.getMonth() - created.getMonth()} month ago`
      } else {
        return `${date.getDate() - created.getDate()} day ago`
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
                              <button className="btn btn-primary">Apply</button>
                            </div>
                            <div className="card-footer text-muted">
                              {console.log(this.ago(vaccancy.date))}
                        </div>
                          </div>
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