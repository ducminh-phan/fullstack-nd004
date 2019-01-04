import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import React, { Component } from 'react';

import Auth from '../utils/auth';
import Storage from '../utils/storage';


class Header extends Component {
  logout = () => {
    Storage.clear();
    this.forceUpdate();
  };

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              Catalog App
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {
            Auth.isAuthenticated()
              ? (
                <React.Fragment>
                  <NavItem id="username" disabled>
                    {Storage.getUserName()}
                  </NavItem>
                  <NavItem onClick={this.logout}>
                    Log out
                  </NavItem>
                </React.Fragment>
              )
              : (
                <NavItem href="/login">
                  Log In
                </NavItem>
              )
          }
        </Nav>
      </Navbar>
    );
  }
}


export default Header;
