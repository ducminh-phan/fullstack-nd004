import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Glyphicon, ListGroup, ListGroupItem,
} from 'react-bootstrap';

import request from '../utils/request';
import Storage from '../utils/storage';


class CategoryList extends Component {
  state = {
    categories: [],
  };

  componentWillMount() {
    this.getCategories();
  }

  getCategories = () => {
    request.get('/categories')
      .then((response) => {
        this.setState(
          {
            categories: response.data,
          },
        );
      });
  };

  render() {
    const { categories } = this.state;

    return (
      <div id="category">
        <div id="category-list-top">
          <Button>
            <Link to="/create" id="add-category">
              Add Category
            </Link>
          </Button>
        </div>

        <div id="category-content">
          <ListGroup id="category-list">
            {categories.map(category => (
              <ListGroupItem key={category.id} className="contact-list-item">
                <div className="clearfix">
                  {category.name}
                  {Storage.getUserID() === category.user.id
                    ? (
                      <span className="pull-right">
                        <Button
                          // onClick={() => onDeleteContact(category)}
                          pullRight
                          bsStyle="xs"
                          className="contact-remove"
                        >
                          <Glyphicon glyph="remove" />
                        </Button>
                      </span>
                    )
                    : null}
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default CategoryList;
