import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import checkLoggedIn from '../auth';


function requireAuth(WrappedComponent) {
  const Wrapper = (props) => {
    const { auth } = props;

    if (!checkLoggedIn(auth)) {
      return <Redirect to="/" />;
    }

    return <WrappedComponent {...props} />;
  };

  Wrapper.propTypes = {
    auth: PropTypes.shape({
      token: PropTypes.string,
      user: PropTypes.object,
    }).isRequired,
  };

  const mapStateToProps = ({ auth }) => ({ auth });

  return connect(mapStateToProps)(Wrapper);
}


export default requireAuth;
