import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { addItem } from '../../actions/item';
import formWrapper from '../../utils/wrappers/formWrapper';


class NewItem extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      categoryId: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const item = {
      name: this.state.name,
      description: this.state.description,
    };

    this.props.addItem(this.state.categoryId, item);
  };

  validateForm() {
    return this.state.name
      && this.state.description
      && this.state.categoryId;
  }

  render() {
    return (
      <div className="new-item">
        <form onSubmit={this.handleSubmit} className="new-item-form">
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Item Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="description" bsSize="large">
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="categoryId">
            <ControlLabel>Category</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.state.categoryId}
              onChange={this.handleChange}
            >
              <option value="">Select Category</option>
              {
                this.props.categories.map(category => (
                  <option
                    value={category.id}
                    key={category.id}
                  >
                    {category.name}
                  </option>))
              }
            </FormControl>
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


const mapStateToProps = ({ categories }) => ({
  categories,
});


const mapDispatchToProps = dispatch => ({
  addItem: (categoryId, item) => dispatch(addItem(categoryId, item)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(formWrapper(NewItem));
