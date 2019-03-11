import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom';

class CompanyDashboard extends Component {

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/signin');
    }
  }

  render() {
    return (
      <div>
          CompanyDashboard
      </div>
    );
  }
}

CompanyDashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

// export default connect(mapStateToProps)(CompanyDashboard);
export default compose(
  connect(mapStateToProps)
)(withRouter(CompanyDashboard))