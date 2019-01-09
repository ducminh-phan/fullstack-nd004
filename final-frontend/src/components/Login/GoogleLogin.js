import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';

import config from '../../config';


export default class GLogin extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired,
  };

  googleLoginSuccess = (response) => {
    this.props.login(response.tokenObj.id_token);
  };

  googleLoginFailure = (response) => {
    this.props.showAlert('error', response.error);
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
