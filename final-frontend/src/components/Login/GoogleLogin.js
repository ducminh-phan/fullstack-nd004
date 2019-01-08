import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';

import config from '../../config';


export default class GLogin extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  googleLoginSuccess = (response) => {
    console.log(response);

    this.props.login(response.code);
  };

  googleLoginFailure = (response) => {
    console.log(false, response.error);
  };

  render() {
    return (
      <div>
        <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          responseType="code"
          onSuccess={this.googleLoginSuccess}
          onFailure={this.googleLoginFailure}
        />
      </div>
    );
  }
}
