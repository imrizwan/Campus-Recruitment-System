import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileCreated } from "../Actions/profileActions";


const PrivateRoute = ({ component: Component, auth, userType, profilecreated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isAuthenticated === true && auth.user.userType === userType) {
                    if(profilecreated){
                        if(!profilecreated.profilecreated){
                            if(rest.location.pathname === "/createprofile" || rest.location.pathname === "/createcompanyprofile"){
                                return <Component {...props} />
                            }
                            if(auth.user.userType === "student"){
                                return <Redirect to="/createprofile" />
                            } else if(auth.user.userType === "company"){
                                return <Redirect to="/createcompanyprofile" />
                            }
                        }
                    }
                    return <Component {...props} />
                } else if(auth.isAuthenticated === true && auth.user.userType !== userType) {
                    return <Redirect to='/unauthorized' />
                } else if(auth.isAuthenticated === false) {
                    return <Redirect to='/signin' />
                }
            }
            }
        />
    )
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profilecreated: state.profilecreated.profilecreated
});

export default connect(mapStateToProps, { getProfileCreated })(PrivateRoute);