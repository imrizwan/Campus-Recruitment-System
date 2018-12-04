import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from '../Components/Protected/Dashboard';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import Navbar from "../Components/Navbar";
import jwt_decode from "jwt-decode";
import store from "../Store/configureStore";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../Actions/authActions";
import PrivateRoute from "./PrivateRoute";
//import createHistory from 'history/createBrowserHistory';
//export const history = createHistory();

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
    window.location.href= "/login";
  }
}

export default class AppRouter extends React.Component {
  render() {
    return (
      <div>
      <Navbar />
      <BrowserRouter>
        <div>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
      <Switch>
          <PrivateRoute exact={true} path="/dashboard" component={Dashboard} />
      </Switch>
      </div>
      </BrowserRouter>
      </div>
    );
  }
}