import { Redirect } from 'react-router-dom';
import React from 'react';

import EmailLogin from './EmailLogin';
import GLogin from './GoogleLogin';
import Auth from '../../utils/auth';
import formWrapper from '../../utils/wrappers/formWrapper';


function LoginForm() {
  if (Auth.isAuthenticated()) {
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
}

const Login = formWrapper(LoginForm);


export default Login;
