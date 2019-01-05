import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


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
          <Navbar.Text id="username">
            {Storage.getUserName()}
          </Navbar.Text>
          <NavItem onClick={this.logout}>
            Log out
          </NavItem>
        </React.Fragment>
      );
    }

    return (
      <LinkContainer to="/login">
        <NavItem>
          Log In
        </NavItem>
      </LinkContainer>
    );
  }
}

export default withRouter(UserAuth);
