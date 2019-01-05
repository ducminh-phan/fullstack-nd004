import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import React from 'react';

import UserAuth from './UserAuth';


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
      <UserAuth />
    </Nav>
  </Navbar>
);


export default Header;
