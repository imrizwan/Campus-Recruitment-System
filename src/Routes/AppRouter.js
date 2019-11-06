import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getProfileCreated } from "../Actions/profileActions";
import Profile from '../Components/Protected/Profile';
import MyProfile from '../Components/Protected/MyProfile';
import PublicDashboard from '../Components/Public/PublicDashboard';
import Dashboard from '../Components/Protected/Dashboard';
import CompanyDashboard from '../Components/Company/CompanyDashboard';
import CreateCompanyProfile from '../Components/Company/CreateCompanyProfile';
import UpdateCompanyProfile from '../Components/Company/UpdateCompanyProfile';
import MyCompanyProfile from '../Components/Company/MyCompanyProfile';
import AddProject from '../Components/Company/AddProject';
import AddVaccancy from '../Components/Company/AddVaccancy';
import StudentProfile from '../Components/Company/StudentProfile';
import SelectionEmail from '../Components/Company/SelectionEmail';
import AppointmentLetter from '../Components/Company/AppointmentLetter';
import SendEmail from '../Components/Company/SendEmail';
import SignIn from '../Components/SignIn';
import Resend from '../Components/Resend';
import ForgotPasswordEmail from '../Components/ForgotPasswordEmail';
import Confirmation from '../Components/Confirmation';
import ChangePassword from '../Components/ChangePassword';
import SignUp from '../Components/SignUp';
import NotFound from '../Components/NotFound';
import AddEducation from '../Components/AddEducation';
import AddProjectStu from '../Components/AddProjectStu';
import AddExperience from '../Components/AddExperience';
import AddLanguage from '../Components/AddLanguage';
import AddExtracurricularActivities from '../Components/AddExtracurricularActivities';
import CreateProfile from '../Components/CreateProfile';
import UpdateProfile from '../Components/UpdateProfile';
import UnAuthorized from '../Components/UnAuthorized';
import Navbar from "../Components/Navbar";
import jwt_decode from "jwt-decode";
import store from "../Store/configureStore";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../Actions/authActions";
import PrivateRoute from "./PrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";
// Admin Imports
import AdminDashboard from '../Components/Admin/AdminDashboard';
import AddUser from '../Components/Admin/AddUser';
import AdminViewStudentProfile from '../Components/Admin/AdminViewStudentProfile';
import AdminViewCompanyProfile from '../Components/Admin/AdminViewCompanyProfile';
import GraduateDirectory from '../Components/Admin/GraduateDirectory';
import AdminUpdateStudentProfile from '../Components/Admin/AdminUpdateStudentProfile';
import AdminUpdateCompanyProfile from '../Components/Admin/AdminUpdateCompanyProfile';

// History Import
import {createBrowserHistory} from 'history';
export const history = createBrowserHistory();


if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  // call setCurrentUser action
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    //Logout User
    store.dispatch(logoutUser());
  
    // TODO: Clear the current profile

    //Redirect to login
    window.location.href= "/signin";
    //this.props.history.push(`/signin`)
  }
}

class AppRouter extends React.Component {

  state= {
    errors: {},
    profilecreated: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profilecreated) {
      this.setState({ profilecreated: nextProps.profilecreated });
  }
  }
  componentWillMount() {
    //its gonna fetch the profile
    if (this.props.auth.isAuthenticated) {
      this.props.getProfileCreated();
    }
  }

  render() {
    if(this.props.auth.isAuthenticated){
            if(!this.state.profilecreated){
              return <Loader />;
            }
       }
    return (
      <div>
      <Router history={history}>
        <div>
      <Navbar history={history} profilecreated={this.state.profilecreated} />
          <Route path="/signin" component={SignIn} />
          <Route path="/resend" component={Resend} />
          <Route path="/forgotpassword" component={ForgotPasswordEmail} />
          <Route path="/confirmation/:token" component={Confirmation} />
          <Route path="/changepassword/:token" component={ChangePassword} />
          <Route path="/signup" component={SignUp} />
          <Route path="/404" component={NotFound} />
          <Route path="/unauthorized" component={UnAuthorized} />
          <Route exact={true} path="/profile/:id" component={Profile} />
          <Route exact={true} path="/" component={PublicDashboard} />
          <Route exact={true} path="/companyprofile/:id" component={MyCompanyProfile} />
      <Switch>
          <PrivateRoute exact={true} path="/companydashboard" userType="company" component={CompanyDashboard} />
          <PrivateRoute exact={true} path="/updatecompanyprofile" userType="company" component={UpdateCompanyProfile} />
          <PrivateRoute exact={true} path="/studentprofile/:id" userType="company" component={StudentProfile} />
          <PrivateRoute exact={true} path="/selectionemail" userType="company" component={SelectionEmail} />
          <PrivateRoute exact={true} path="/appointmentletter" userType="company" component={AppointmentLetter} />
          <PrivateRoute exact={true} path="/sendemail/:vaccancyid" userType="company" component={SendEmail} />
          <PrivateRoute exact={true} path="/createcompanyprofile" userType="company" component={CreateCompanyProfile} />
          <PrivateRoute exact={true} path="/addproject" userType="company" component={AddProject} />
          <PrivateRoute exact={true} path="/addvaccancy" userType="company"  component={AddVaccancy} />
          <PrivateRoute exact={true} path="/studentdashboard" userType="student" component={Dashboard} />
          <PrivateRoute exact={true} path="/addextracurricularactivities" userType="student" component={AddExtracurricularActivities} />
          <PrivateRoute exact={true} path="/profile" userType="student" component={MyProfile} />
          <PrivateRoute exact={true} path="/addprojectstu" userType="student" component={AddProjectStu} />
          <PrivateRoute exact={true} path="/createprofile" userType="student" component={CreateProfile} />
          <PrivateRoute exact={true} path="/updateprofile" userType="student" component={UpdateProfile} />
          <PrivateRoute exact={true} path="/addeducation" userType="student" component={AddEducation} />
          <PrivateRoute exact={true} path="/addexperience" userType="student" component={AddExperience} />
          <PrivateRoute exact={true} path="/addlanguage" userType="student" component={AddLanguage} />
          {/* Admin Routes */}
          <AdminPrivateRoute exact={true} path="/adminviewstudentprofile/:id" component={AdminViewStudentProfile} />
          <AdminPrivateRoute exact={true} path="/adminviewcompanyprofile/:id" component={AdminViewCompanyProfile} />
          <AdminPrivateRoute exact={true} path="/graduatedirectory" component={GraduateDirectory} />
          <AdminPrivateRoute exact={true} path="/adminupdatestudentprofile/:id" component={AdminUpdateStudentProfile} />
          <AdminPrivateRoute exact={true} path="/adminupdatecompanyprofile/:id" component={AdminUpdateCompanyProfile} />
          <AdminPrivateRoute exact={true} path="/adduser" component={AddUser} />
          <AdminPrivateRoute exact={true} path="/admindashboard" component={AdminDashboard} />
      </Switch>
      </div>
      </Router>
      </div>
    );
  }
}

AppRouter.propTypes = {
  getProfileCreated: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
auth: state.auth,
profilecreated: state.profilecreated.profilecreated
});

export default connect(mapStateToProps, { getProfileCreated })(AppRouter);