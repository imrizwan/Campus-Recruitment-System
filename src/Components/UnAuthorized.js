import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'

class UnAuthorized extends Component {

  componentDidMount(){
    if(!this.props.auth.isAuthenticated){
      this.props.history.push('/signin');
    } 
  }

  render() {
    return (
      <h1>
          You have no access to this page
      </h1>
    );
  }
}

UnAuthorized.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

// export default connect(mapStateToProps)(UnAuthorized);
export default compose(
  connect(mapStateToProps)
)(withRouter(UnAuthorized))