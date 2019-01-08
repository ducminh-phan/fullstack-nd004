import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import EmailLogin from '../../containers/Login/EmailLogin';
import GLogin from '../../containers/Login/GoogleLogin';


class LoginForm extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  render() {
    if (this.props.isLoggedIn) {
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
}


export default LoginForm;
