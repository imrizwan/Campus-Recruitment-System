import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfileCreated } from "../Actions/profileActions";


const PrivateRoute = ({ component: Component, auth, profilecreated, ...rest }) => { 

    // if(profilecreated){
    //     var profilecreatedVar = JSON.parse(localStorage.getItem('profilecreated'));
    //     console.log(profilecreatedVar, rest.path)
    // }
    return (
    <Route 
        { ...rest} 
        render={props => {
            if(auth.isAuthenticated === true){
                return <Component {...props} />
            } else {
                return <Redirect to='/signin'/>
            }
        // }
            // auth.isAuthenticated === true ? 
            // profilecreatedVar === true ? 
            // profilecreatedVar && rest.path === "/createprofile" ? 
            // <Redirect to="/updateprofile" /> 
            // : <Component { ...props} /> 
            // : rest.path==="/createprofile" 
            // ? <Component { ...props} /> 
            // : <Redirect to="/createprofile" />
            // : (
            //     <Redirect to="/signin" />
            // )
        }
        }
    />
)};

PrivateRoute.proptypes = {
    auth: PropTypes.object.isRequired,
    getProfileCreated: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profilecreated: state.profilecreated.profilecreated
  });

export default connect(mapStateToProps, { getProfileCreated })(PrivateRoute);