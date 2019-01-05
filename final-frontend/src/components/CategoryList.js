import React, { Component } from 'react';
import { Button, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { request } from '../utils/request';
import Auth from '../utils/auth';
import Storage from '../utils/storage';


class CategoryList extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
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
        {Auth.isAuthenticated()
          ? (
            <div id="category-list-top">
              <Link to="/create" className="btn btn-default">
                Add Category
              </Link>
            </div>
          )
          : null}

        <div id="category-content" className="vertical-pad">
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
                          bsStyle="danger"
                          bsSize="xs"
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
