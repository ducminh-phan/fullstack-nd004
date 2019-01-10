import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


import formWrapper from '../../utils/wrappers/formWrapper';
import checkLoggedIn from '../../utils/auth';
import EmailLogin from './EmailLoginConnected';
import GLogin from './GoogleLoginConnected';


const LoginForm = (props) => {
  if (props.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <EmailLogin />

      <div id="extra-login">
        <GLogin />
      </div>
    </React.Fragment>
  );
};


LoginForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};


const mapStateToProps = ({ auth }) => ({
  isLoggedIn: checkLoggedIn(auth),
});


const LoginContainer = connect(
  mapStateToProps,
)(LoginForm);


const Login = formWrapper(LoginContainer);


export default Login;
