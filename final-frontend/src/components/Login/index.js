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
    <div className="row">
      <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <EmailLogin />

        <div id="extra-login">
          <GLogin />
        </div>
      </div>
    </div>
  );
}


export default Login;
