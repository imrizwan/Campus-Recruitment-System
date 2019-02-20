import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class CreateCompanyProfile extends Component {

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/signin');
    }
  }

  render() {
    return (
      <div>
          CreateCompanyProfile
      </div>
    );
  }
}

CreateCompanyProfile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CreateCompanyProfile);
