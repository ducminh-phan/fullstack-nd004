import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';


class CategoryListBody extends Component {
  componentDidMount() {
    const { categoryId } = this.props.match.params;
    if (categoryId) {
      this.props.getItems(categoryId);
    }
  }

  handleClick = (event) => {
    const categoryId = parseInt(event.currentTarget.getAttribute('category-id'), 10);
    this.props.getItems(categoryId);
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
              className="contact-list-item"
              disabled={categoryId === category.id.toString()}
            >
              <Link
                to={`/categories/${category.id}`}
                onClick={this.handleClick}
                category-id={category.id}
              >
                {category.name}
              </Link>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}


CategoryListBody.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  getItems: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};


export default CategoryListBody;
