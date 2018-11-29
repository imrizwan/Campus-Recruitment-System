import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Dashboard from '../Components/Protected/Dashboard';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import Navbar from "../Components/Navbar";
import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

export default class AppRouter extends React.Component {
  render() {
    return (
      <div>
      <Navbar />
      <Router history={history}>
      <Switch>
          <Route exact={true} path="/" component={Dashboard} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
      </Switch>
      </Router>
      </div>
    );
  }
}