import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Proptypes from "prop-types";


const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route 
        { ...rest} 
        render={props => 
            auth.isAuthenticated === true ? 
            <Component 
            { ...props}  
            /> : (
                <Redirect to="/signin" />
            )
        }
    />
);

PrivateRoute.proptypes = {
    auth: Proptypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });

export default connect(mapStateToProps)(PrivateRoute);