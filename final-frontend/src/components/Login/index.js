import { Redirect } from 'react-router-dom';
import React from 'react';

import EmailLogin from './EmailLogin';
import GLogin from './GoogleLogin';
import Auth from '../../utils/auth';


function Login() {
  if (Auth.isAuthenticated()) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <EmailLogin />

      <div id="extra-login">
        <GLogin />
      </div>
    </div>
  );
}


export default Login;
