import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { request } from '../../utils/request';
import Auth from '../../utils/auth';
import Storage from '../../utils/storage';


export default class EmailLogin extends Component {
  static propTypes = {
    changeStatus: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: Auth.isAuthenticated(),
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    request.post('/login', {
      email: this.state.email,
      password: this.state.password,
    }).then((response) => {
      Storage.setToken(response.data);
      this.setState({ isAuthenticated: true });
    }).catch((error) => {
      this.props.changeStatus(false, error.response.data.error_message);
    });
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
