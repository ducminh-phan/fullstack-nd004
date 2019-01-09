import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';


const UserAuth = (props) => {
  if (props.isLoggedIn) {
    return (
      <React.Fragment>
        <Navbar.Text id="username">
          {props.username}
        </Navbar.Text>
        <NavItem onClick={props.logout}>
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
};


UserAuth.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default UserAuth;
