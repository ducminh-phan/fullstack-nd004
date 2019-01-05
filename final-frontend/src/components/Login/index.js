import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import EmailLogin from './EmailLogin';
import GLogin from './GoogleLogin';
import Auth from '../../utils/auth';
import formWrapper from '../../utils/wrappers/formWrapper';


class LoginForm extends Component {
  static propTypes = {
    changeStatus: PropTypes.func.isRequired,
  };

  render() {
    if (Auth.isAuthenticated()) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <EmailLogin changeStatus={this.props.changeStatus} />

        <div id="extra-login">
          <GLogin changeStatus={this.props.changeStatus} />
        </div>
      </React.Fragment>
    );
  }
}

const Login = formWrapper(LoginForm);


export default Login;
