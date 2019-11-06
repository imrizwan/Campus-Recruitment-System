import React from "react";
import { connect } from "react-redux";
import Loader from "../Loader/Loader";
import isEmpty from "../../validation/is-empty";
import {
  getAllStudents
} from "../../Actions/adminActions"
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import Img from "../../assets/noimg.png";

class GraduateDirectory extends React.Component {

  componentDidMount() {
    this.props.getAllStudents()
  }

  render() {
    return isEmpty(this.props.getallstudent) ?
      <Loader /> : (
        <div className="mx-4 mt-4">
          {
            this.props.getallstudent.map((student) => (
              <div className="card my-4">
                {/* <h5 className="card-header">Featured</h5> */}
                <div className="card-body" style={{ backgroundColor: "green", color: "white" }}>
                  <div className="row">
                    <img src={isEmpty(student.url) ? Img : student.url} className="img-thumbnail col-2" />
                    <div className="col-10">
                      <div className="row ml-1">
                        <h5 className="card-title">{student.name}&nbsp;&nbsp;</h5> | <p>&nbsp;&nbsp;{student.phoneNumber}&nbsp;&nbsp;</p> | <p>&nbsp;&nbsp;{student.mail}</p>
                      </div>
                      <p className="card-text" style={{ textAlign: "justify" }}>{student.description}</p>
                      {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      )
  }
}

const mapStateToProps = state => ({
  getallstudent: state.admin.getallstudent,
  auth: state.auth,
  errors: state.errors,
});

export default compose(
  // withStyles(styles),
  connect(
    mapStateToProps,
    { getAllStudents }
  )
)(withRouter(GraduateDirectory));
