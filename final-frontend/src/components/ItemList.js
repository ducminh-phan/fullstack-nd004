import React from 'react';
import { Button, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from '../utils/auth';
import Storage from '../utils/storage';


const ItemList = (props) => {
  const { items } = props;

  return (
    <div id="item">
      {Auth.isAuthenticated()
        ? (
          <div id="item-list-top">
            <Link to="/new-item" className="btn btn-default">
              Add Item
            </Link>
          </div>
        )
        : null}

      <div id="item-content" className="vertical-pad">
        <ListGroup id="item-list">
          {items.map(item => (
            <ListGroupItem
              key={item.id}
              className="contact-list-item"
            >
              <div className="clearfix">
                {item.name}
                {Storage.getUserID() === item.user.id
                  ? (
                    <span className="pull-right">
                      <Button
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
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItemList;
