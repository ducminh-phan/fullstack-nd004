import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { request } from '../../utils/request';
import config from '../../config';
import Storage from '../../utils/storage';
import Auth from '../../utils/auth';


export default class GLogin extends Component {
  static propTypes = {
    changeStatus: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: Auth.isAuthenticated(),
    };
  }

  googleLoginSuccess = (response) => {
    const data = {
      code: response.code,
    };

    this.loginByGoogle(data);
  };

  googleLoginFailure = (response) => {
    this.props.changeStatus(false, response.error);
  };

  loginByGoogle = (data) => {
    request.post('/login/google', data)
      .then((response) => {
        Storage.setToken(response.data);
        this.setState({ isAuthenticated: true });
      })
      .catch((error) => {
        this.props.changeStatus(false, error.response.data.error_message);
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
