import React, { Component } from 'react';
import { Button, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class ItemListBody extends Component {
  handleDeleteItem = (event) => {
    const itemID = parseInt(event.currentTarget.getAttribute('item-id'), 10);

    this.props.deleteItem(this.props.selectedCategoryID, itemID);
  };

  render() {
    const { items } = this.props;

    return (
      <div id="item-content" className="vertical-pad">
        <ListGroup id="item-list">
          {items.map(item => (
            <ListGroupItem
              key={item.id}
              className="contact-list-item"
            >
              <div className="clearfix">
                <Link to={`/categories/${this.props.selectedCategoryID}/items/${item.id}`}>
                  {item.name}
                </Link>
                {this.props.userId === item.user.id
                  ? (
                    <span className="pull-right">
                      <Button
                        bsStyle="danger"
                        bsSize="xs"
                        className="contact-remove"
                        item-id={item.id}
                        onClick={this.handleDeleteItem}
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
    );
  }
}


ItemListBody.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCategoryID: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  deleteItem: PropTypes.func.isRequired,
};


export default ItemListBody;
