import React, { Component } from 'react';
import { NavItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import Auth from '../../utils/auth';
import Storage from '../../utils/storage';


class UserAuth extends Component {
  logout = () => {
    Storage.clear();
    this.props.history.push('/');
  };

  render() {
    if (Auth.isAuthenticated()) {
      return (
        <React.Fragment>
          <NavItem id="username" disabled>
            {Storage.getUserName()}
          </NavItem>
          <NavItem onClick={this.logout}>
            Log out
          </NavItem>
        </React.Fragment>
      );
    }

    return (
      <NavItem href="/login">
        Log In
      </NavItem>
    );
  }
}

export default withRouter(UserAuth);
