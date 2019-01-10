import { Link, withRouter } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import React from 'react';

import UserAuth from './UserAuthConnected';


const UserAuthWithRouter = withRouter(UserAuth);


const Header = () => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">
          Catalog App
        </Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav pullRight>
      <UserAuthWithRouter />
    </Nav>
  </Navbar>
);


export default Header;
