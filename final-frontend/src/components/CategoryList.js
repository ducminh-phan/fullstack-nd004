import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import request from '../utils/request';
import Storage from '../utils/storage';


class CategoryList extends Component {
  state = {
    categories: [],
  };

  componentWillMount() {
    request.get('/categories')
      .then((response) => {
        this.setState(
          {
            categories: response.data,
          },
        );
      });
  }

  render() {
    const { categories } = this.state;

    return (
      <div className="categories">
        <div className="list-contacts-top">
          <Link to="/create" className="add-category">
            Add Category
          </Link>
        </div>

        <ol className="category-list">
          {categories.map(category => (
            <li key={category.id} className="contact-list-item">
              <div className="contact-details">
                <p>{category.name}</p>
              </div>
              {(Storage.getUserID() === category.user.id) ? (
                <button
                  type="button"
                  // onClick={() => onDeleteContact(category)}
                  className="contact-remove"
                >
                  Remove
                </button>
              ) : (<span />)
              }
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default CategoryList;
