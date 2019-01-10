import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import addCategory from '../../actions/category';
import formWrapper from '../../utils/wrappers/formWrapper';


class NewCategory extends Component {
  static propTypes = {
    addCategory: PropTypes.func.isRequired,
  };

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

    this.props.addCategory(this.state.name);
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


const mapDispatchToProps = dispatch => ({
  addCategory: name => dispatch(addCategory(name)),
});


export default connect(
  null,
  mapDispatchToProps,
)(formWrapper(NewCategory));
