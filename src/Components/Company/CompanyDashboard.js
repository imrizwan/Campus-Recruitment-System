import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withRouter, Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import Loader from "../Loader/Loader";
import "./index.css";
import TimeAgo from "react-timeago";
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import NoIMG from "../../assets/noimg.png"
import {
  getProfileCreated,
  getCurrentCompanyProfile,
  deleteVaccancy,
  updateVaccancy,
  getCandidates
} from "../../Actions/companyProfileActions";
const formatter = buildFormatter(englishStrings);
class CompanyDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {},
      position: "",
      degreerequired: "",
      jobtype: "",
      skillsrequired: "",
      description: "",
      contactno: "",
      success: "",
      key: ""
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.setState({ success: nextProps.success });
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getCurrentCompanyProfile();
    }

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/signin");
    }

    if (this.props.auth.isAuthenticated) {
      this.props.getProfileCreated();
      if (!isEmpty(this.props.profilecreated)) {
        if (!this.props.profilecreated.profilecreated) {
          if (this.props.auth.user.userType === "student") {
            this.props.history.push("/createprofile");
          } else this.props.history.push("/createcompanyprofile");
        }
      }
    }
  }

  apply = vaccancy => {
    this.props.deleteVaccancy(vaccancy._id);
    window.location.reload();
  };

  ago = created => {
    let date = new Date();
    let TodaysDate = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;
    created = new Date(created);
    let createdDate = `${created.getDate()} ${created.getMonth()} ${created.getFullYear()}`;
    if (TodaysDate === createdDate) {
      return "Published Today";
    } else {
      if (
        date.getDate() === created.getDate() &&
        date.getMonth() === created.getMonth() &&
        date.getDate() === created.getDate() &&
        date.getFullYear() !== created.getFullYear()
      ) {
        if (date.getFullYear() - created.getFullYear() === 0) {
          return `1 year ago`;
        } else return `${date.getFullYear() - created.getFullYear()} years ago`;
      } else if (
        date.getDate() !== created.getDate() &&
        date.getMonth() === created.getMonth() &&
        date.getDate() !== created.getDate() &&
        date.getFullYear() === created.getFullYear()
      ) {
        if (date.getMonth() - created.getMonth() === 0) {
          return `1 month ago`;
        } else return `${date.getMonth() - created.getMonth()} months ago`;
      } else {
        if (date.getDate() - created.getDate() === 0) {
          return `1 day ago`;
        } else return `${date.getDate() - created.getDate()} days ago`;
      }
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  update = data => {
    this.props.updateVaccancy(data);
  };

  render() {
    if (
      isEmpty(this.props.profilecreated) ||
      isEmpty(this.props.companyprofiles.profile)
    ) {
      return <Loader />;
    } else {
      return (
        <div className="container">
          <br />
          {this.props.companyprofiles ? (
            this.props.companyprofiles.profile ? (
              isEmpty(this.props.companyprofiles.profile.vaccancy) ? (
                <h4 className="text-center">No Vaccancies</h4>
              ) : (
                <h4 className="text-center">Your Vaccancies</h4>
              )
            ) : null
          ) : null}
          <br />
          {!isEmpty(this.props.companyprofiles) ? (
            <div>
              {this.props.companyprofiles.profile ? (
                this.props.companyprofiles.profile.vaccancy.map(
                  (vaccancy, index) => {
                    return (
                      <div key={index} className="marginBottom">
                        <div className="card text-justify">
                          <div className="card-header">{vaccancy.position}</div>
                          <div className="card-body">
                            <h5 className="card-title">Skills Required</h5>
                            <ul className="card-text ">
                              {vaccancy.skillsrequired[0]
                                .split(",")
                                .map((skills, index3) => (
                                  <li key={index3}>{skills}</li>
                                ))}
                            </ul>
                            <p className="card-text">{vaccancy.description}</p>
                            <h5 className="card-title">
                              {`${vaccancy.degreerequired.replace(
                                ",",
                                "/"
                              )} required`}
                            </h5>
                            <h5 className="card-title">
                              {`Job Type: ${vaccancy.jobtype}`}
                            </h5>
                            <h5 className="card-title">
                              {`Contact No: ${vaccancy.contactno}`}
                            </h5>
                            <div
                              className="btn btn-info margin"
                              data-toggle="modal"
                              data-target="#editmodal"
                              onClick={() =>
                                this.setState({
                                  id: vaccancy._id,
                                  position: vaccancy.position,
                                  degreerequired: vaccancy.degreerequired,
                                  jobtype: vaccancy.jobtype,
                                  skillsrequired: vaccancy.skillsrequired,
                                  description: vaccancy.description,
                                  contactno: vaccancy.contactno
                                })
                              }
                            >
                              Edit
                            </div>
                            <div
                              className="btn btn-danger margin"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => this.setState({ data: vaccancy })}
                            >
                              Delete
                            </div>
                            <div
                              className="btn btn-success"
                              data-toggle="modal"
                              data-target="#candidatesModal"
                              onClick={() => {
                                this.props.getCandidates(
                                  this.props.profilecreated.applied.filter(
                                    item =>
                                      item.key.indexOf(
                                        `${vaccancy._id}${this.props.auth.user.id}`
                                      ) !== -1
                                  )
                                );
                                this.setState({ key: vaccancy });
                              }}
                            >
                              Candidates
                            </div>
                          </div>
                          <div className="card-footer text-muted text-center">
                            {/* {this.ago(vaccancy.date)} */}
                            <TimeAgo
                              date={vaccancy.date}
                              formatter={formatter}
                            />
                          </div>
                        </div>
                        {/* Candidates Modal */}
                        <div
                          className="modal fade"
                          id="CandidatesModal"
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="CandidatesModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="CandidatesModalLabel"
                                >
                                  {vaccancy.position} - {vaccancy.jobtype}
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                {this.state.errors.deletevaccany ? (
                                  <div style={{ color: "red" }}>
                                    {this.state.errors.deletevaccany}
                                  </div>
                                ) : (
                                  "Are you sure?"
                                )}
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  data-dismiss="modal"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  data-dismiss="modal"
                                  onClick={() => this.apply(this.state.data)}
                                >
                                  Confirm
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Candidates Modal End */}
                        {/* edit modal */}
                        <div
                          className="modal fade"
                          id="editmodal"
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="editmodal"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="editmodallabel">
                                  New message
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="form-group">
                                    <label
                                      htmlFor="position-name"
                                      className="col-form-label"
                                    >
                                      Position:
                                    </label>
                                    <input
                                      type="text"
                                      value={this.state.position}
                                      onChange={this.handleChange("position")}
                                      className="form-control"
                                      id="position-name"
                                    />
                                    {this.state.errors.position ? (
                                      <div style={{ color: "red" }}>
                                        {this.state.errors.position}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="form-group">
                                    <label
                                      htmlFor="qualification-name"
                                      className="col-form-label"
                                    >
                                      Qualification:
                                    </label>
                                    <input
                                      type="text"
                                      value={this.state.degreerequired}
                                      onChange={this.handleChange(
                                        "degreerequired"
                                      )}
                                      className="form-control"
                                      id="qualification-name"
                                    />
                                    {this.state.errors.degreerequired ? (
                                      <div style={{ color: "red" }}>
                                        {this.state.errors.degreerequired}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="form-group">
                                    <label
                                      htmlFor="skills-name"
                                      className="col-form-label"
                                    >
                                      Required Skills:
                                    </label>
                                    <input
                                      type="text"
                                      value={this.state.skillsrequired}
                                      onChange={this.handleChange(
                                        "skillsrequired"
                                      )}
                                      className="form-control"
                                      id="skills-name"
                                    />
                                    {this.state.errors.skillsrequired ? (
                                      <div style={{ color: "red" }}>
                                        {this.state.errors.skillsrequired}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="form-group">
                                    <label
                                      htmlFor="message-text"
                                      className="col-form-label"
                                    >
                                      Message:
                                    </label>
                                    <textarea
                                      value={this.state.description}
                                      onChange={this.handleChange(
                                        "description"
                                      )}
                                      className="form-control"
                                      id="message-text"
                                    ></textarea>
                                    {this.state.errors.description ? (
                                      <div style={{ color: "red" }}>
                                        {this.state.errors.description}
                                      </div>
                                    ) : null}
                                  </div>
                                  <select
                                    value={this.state.jobtype}
                                    onChange={this.handleChange("jobtype")}
                                    className="custom-select"
                                    id="inputGroupSelect03"
                                  >
                                    <option value="">Select Job Type...</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Intern">Intern</option>
                                  </select>
                                  {this.state.errors.jobtype ? (
                                    <div style={{ color: "red" }}>
                                      {this.state.errors.jobtype}
                                    </div>
                                  ) : null}
                                  <div className="form-group">
                                    <label
                                      htmlFor="recipient-name"
                                      className="col-form-label"
                                    >
                                      Contact No.
                                    </label>
                                    <input
                                      value={this.state.contactno}
                                      type="text"
                                      onChange={this.handleChange("contactno")}
                                      className="form-control"
                                      id="recipient-name"
                                    />
                                    {this.state.errors.contactno ? (
                                      <div style={{ color: "red" }}>
                                        {this.state.errors.contactno}
                                      </div>
                                    ) : null}
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                  onClick={() =>
                                    this.setState({
                                      id: "",
                                      position: "",
                                      degreerequired: "",
                                      jobtype: "",
                                      skillsrequired: "",
                                      description: "",
                                      contactno: ""
                                    })
                                  }
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() =>
                                    this.update({
                                      id: this.state.id,
                                      position: this.state.position,
                                      degreerequired: this.state.degreerequired,
                                      jobtype: this.state.jobtype,
                                      skillsrequired: this.state.skillsrequired,
                                      description: this.state.description,
                                      contactno: this.state.contactno
                                    })
                                  }
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* edit modal end */}
                        {/* Modal */}
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  {vaccancy.position} - {vaccancy.jobtype}
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                {this.state.errors.deletevaccany ? (
                                  <div style={{ color: "red" }}>
                                    {this.state.errors.deletevaccany}
                                  </div>
                                ) : (
                                  "Are you sure?"
                                )}
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  data-dismiss="modal"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  data-dismiss="modal"
                                  onClick={() => this.apply(this.state.data)}
                                >
                                  Confirm
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Modal End */}
                        {/* Check Candidates Start */}
                        <div
                          className="modal fade"
                          id="candidatesModal"
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="candidatesModalCenterTitle"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="candidatesModalCenterTitle"
                                >
                                  Candidates
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                {isEmpty(this.props.getcandidates)
                                  ? null
                                  : this.props.getcandidates.map(
                                      (student) => (
                                        <div key={student.user} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                          <div className="flex-column">
                                            {student.name}
                                            <p>
                                              <small>
                                                {student.phoneNumber}
                                              </small>
                                              <br/>
                                              <small>{student.location}</small>
                                            </p>
                                            <span
                                              className="badge badge-info badge-pill"
                                              style={{ padding: 5 }}
                                            >
                                              {student.mail}
                                            </span>
                                            <div>
                                            <br/>
                                            <Link target="_blank" to={`/studentprofile/${student.user}`} className="btn btn-primary"  style={{ marginRight: 5 }}>View Profile</Link>
                                            <Link target="_blank" to={`/selectionemail?mail=${student.mail}&position=${this.state.key.position}&company=${this.props.auth.user.fullname}&companyemail=${this.props.auth.user.email}`} className="btn btn-succcess">Send Email</Link>
                                            </div>
                                          </div>
                                          <div className="image-parent">
                                            <img
                                              style={{ width: 150, height: 150 }}
                                              src={isEmpty(student.url) ? <NoIMG/> : student.url }
                                              className="img-fluid"
                                              alt="quixote"
                                            />
                                          </div>
                                        </div>
                                      )
                                    )}
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Check Candidates End */}
                      </div>
                    );
                  }
                )
              ) : (
                <h4 className="text-center">No vaccancy</h4>
              )}
            </div>
          ) : (
            <h4 className="text-center">No vaccancy</h4>
          )}
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
  errors: state.errors,
  profilecreated: state.profilecreated.profilecreated,
  success: state.profilecreated.success,
  getcandidates: state.profile.getcandidates
});

// export default connect(mapStateToProps)(CompanyDashboard);
export default compose(
  connect(
    mapStateToProps,
    {
      getProfileCreated,
      getCurrentCompanyProfile,
      deleteVaccancy,
      updateVaccancy,
      getCandidates
    }
  )
)(withRouter(CompanyDashboard));
