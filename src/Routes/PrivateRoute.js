import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfileCreated } from "../Actions/profileActions";


const PrivateRoute = ({ component: Component, auth, userType, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isAuthenticated === true && auth.user.userType === userType) {
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

PrivateRoute.proptypes = {
    auth: PropTypes.object.isRequired,
    getProfileCreated: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profilecreated: state.profilecreated.profilecreated
});

export default connect(mapStateToProps, { getProfileCreated })(PrivateRoute);