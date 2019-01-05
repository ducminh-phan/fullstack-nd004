import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

import formWrapper from '../utils/wrappers/formWrapper';
import { authRequest } from '../utils/request';


class NewCategoryBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    authRequest.post('/categories', {
      name: this.state.name,
    }).then((response) => {
      console.log(response.data);
    });
  };

  validateForm() {
    return this.state.name.length > 0;
  }

  render() {
    return (
      <div className="new-category">
        <form onSubmit={this.handleSubmit} className="new-category-form">
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Category Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const NewCategory = formWrapper(NewCategoryBody);


export default NewCategory;
