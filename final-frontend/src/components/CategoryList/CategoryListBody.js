import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';


class CategoryListBody extends Component {
  handleClick = (event) => {
    const categoryId = event.currentTarget.getAttribute('category-id');

    this.props.history.push(`/categories/${categoryId}`);
  };

  render() {
    const { categories } = this.props;
    const { categoryId } = this.props.match.params;

    return (
      <div id="category-content" className="vertical-pad">
        <ListGroup id="category-list">
          {categories.map(category => (
            <ListGroupItem
              key={category.id}
              category-id={category.id}
              className="contact-list-item"
              disabled={categoryId === category.id.toString()}
              onClick={this.handleClick}
            >
              {category.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}


CategoryListBody.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};


export default CategoryListBody;
