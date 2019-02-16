import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Profile from '../Components/Protected/Profile';
import MyProfile from '../Components/Protected/MyProfile';
import Dashboard from '../Components/Protected/Dashboard';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import NotFound from '../Components/NotFound';
import AddEducation from '../Components/AddEducation';
import AddExperience from '../Components/AddExperience';
import CreateProfile from '../Components/CreateProfile';
import UpdateProfile from '../Components/UpdateProfile';
import Navbar from "../Components/Navbar";
import jwt_decode from "jwt-decode";
import store from "../Store/configureStore";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../Actions/authActions";
import PrivateRoute from "./PrivateRoute";
import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

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

export default class AppRouter extends React.Component {
  render() {
    return (
      <div>
      <Router history={history}>
        <div>
      <Navbar history={history} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/404" component={NotFound} />
          <Route exact={true} path="/profile/:id" component={Profile} />
      <Switch>
          <PrivateRoute exact={true} path="/dashboard" component={Dashboard} />
          <PrivateRoute exact={true} path="/profile" component={MyProfile} />
          <PrivateRoute exact={true} path="/createprofile" component={CreateProfile} />
          <PrivateRoute exact={true} path="/updateprofile" component={UpdateProfile} />
          <PrivateRoute exact={true} path="/addeducation" component={AddEducation} />
          <PrivateRoute exact={true} path="/addexperience" component={AddExperience} />
      </Switch>
      </div>
      </Router>
      </div>
    );
  }
}