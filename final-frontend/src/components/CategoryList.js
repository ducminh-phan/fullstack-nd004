import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from '../utils/auth';


const CategoryList = (props) => {
  const { categories } = props;

  return (
    <div id="category">
      {Auth.isAuthenticated()
        ? (
          <div id="category-list-top">
            <Link to="/new-category" className="btn btn-default">
              Add Category
            </Link>
          </div>
        )
        : null}

      <div id="category-content" className="vertical-pad">
        <ListGroup id="category-list">
          {categories.map(category => (
            <ListGroupItem
              key={category.id}
              className="contact-list-item"
              onClick={props.handleSelectCategory}
              category-id={category.id}
              disabled={props.selectedCategoryID === category.id}
            >
              <div className="clearfix">
                {category.name}
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCategoryID: PropTypes.number,
  handleSelectCategory: PropTypes.func.isRequired,
};

CategoryList.defaultProps = {
  selectedCategoryID: 0,
};

export default CategoryList;
