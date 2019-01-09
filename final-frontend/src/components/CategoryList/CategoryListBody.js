import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';


const CategoryListBody = (props) => {
  const { categories } = props;
  const { categoryId } = props.match.params;

  return (
    <div id="category-content" className="vertical-pad">
      <ListGroup id="category-list">
        {categories.map(category => (
          <ListGroupItem
            key={category.id}
            className="contact-list-item"
            disabled={categoryId === category.id.toString()}
          >
            <Link
              to={`/categories/${category.id}`}
            >
              {category.name}
            </Link>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};


CategoryListBody.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};


export default CategoryListBody;
