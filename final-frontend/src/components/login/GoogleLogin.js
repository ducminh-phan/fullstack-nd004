import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import request from '../../utils/request';
import { showMessage } from '../../utils/toastr';
import config from '../../config';


export default class GLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false, token: '', user: null };
  }

  googleLoginSuccess = (response) => {
    console.log(response);

    const data = {
      access_token: response.accessToken,
      token_id: response.tokenId,
    };
    this.loginByGoogle(data);
  };

  googleLoginFailure = (response) => {
    showMessage('error', 'Error', response.error);
  };

  loginByGoogle = (data) => {
    request.post('/login/google', data).then((response) => {
      console.log(response);

      this.setState({ isAuthenticated: true, token: response.access_token });
    }).catch((err) => {
      console.log(err);
      showMessage('error', 'Error', err.data.error_message);
    });
  };

  render() {
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
