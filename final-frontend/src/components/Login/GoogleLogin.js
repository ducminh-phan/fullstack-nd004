import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';

import request from '../../utils/request';
import { showMessage } from '../../utils/toastr';
import config from '../../config';
import Storage from '../../utils/storage';
import Auth from '../../utils/auth';


export default class GLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: Auth.isAuthenticated(),
    };
  }

  googleLoginSuccess = (response) => {
    console.log(response);

    const data = {
      code: response.code,
    };

    this.loginByGoogle(data);
  };

  googleLoginFailure = (response) => {
    showMessage('error', 'Error', response.error);
  };

  loginByGoogle = (data) => {
    request.post('/login/google', data)
      .then((response) => {
        console.log(response);

        Storage.setToken(response.data);
        this.setState({ isAuthenticated: true });
      })
      .catch((error) => {
        showMessage('error', 'Error', error.response.data.error_message);
      });
  };

  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          onSuccess={this.googleLoginSuccess}
          onFailure={this.googleLoginFailure}
        />
      </div>
    );
  }
}
