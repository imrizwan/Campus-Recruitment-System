import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


const AdminPrivateRoute = ({ component: Component, auth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isAuthenticated === true && auth.user.userType === "admin") {
                    return <Component {...props} />
                } else if(auth.isAuthenticated === true && auth.user.userType !== "admin") {
                    return <Redirect to='/unauthorized' />
                } else if(auth.isAuthenticated === false) {
                    return <Redirect to='/signin' />
                }
            }
            }
        />
    )
};

AdminPrivateRoute.proptypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(AdminPrivateRoute);