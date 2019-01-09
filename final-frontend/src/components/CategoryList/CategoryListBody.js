import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';


class CategoryListBody extends Component {
  handleSelectCategory = (event) => {
    const categoryID = parseInt(event.currentTarget.getAttribute('category-id'), 10);

    this.props.selectCategory(categoryID);
  };

  render() {
    const { categories } = this.props;

    return (
      <div id="category-content" className="vertical-pad">
        <ListGroup id="category-list">
          {categories.map(category => (
            <ListGroupItem
              key={category.id}
              className="contact-list-item"
              onClick={this.handleSelectCategory}
              category-id={category.id}
              disabled={this.props.selectedCategoryID === category.id}
            >
              <div className="clearfix">
                {category.name}
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}


CategoryListBody.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectCategory: PropTypes.func.isRequired,
  selectedCategoryID: PropTypes.number.isRequired,
};


export default CategoryListBody;
