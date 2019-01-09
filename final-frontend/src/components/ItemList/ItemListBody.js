import React, { Component } from 'react';
import { Button, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';


class ItemListBody extends Component {
  componentDidMount() {
    const { categoryId } = this.props.match.params;
    this.props.getItems(categoryId);
  }

  componentDidUpdate(prevProps) {
    // Check if the categoryId in the URL has changed, so that we can get items if necessary
    const prevCategoryId = prevProps.match.params.categoryId;
    const nextCategoryId = this.props.match.params.categoryId;

    if (prevCategoryId !== nextCategoryId) {
      // The categoryId from URL has changed, we need to get new items
      this.props.getItems(nextCategoryId);
    }
  }

  handleDeleteItem = (event) => {
    // Prevent click event on the ListGroupItem, so that we are not routed to the item page
    event.stopPropagation();

    const itemId = parseInt(event.currentTarget.getAttribute('item-id'), 10);
    const item = this.props.items.filter(it => (it.id === itemId))[0];

    this.props.deleteItem(item.category.id, itemId);
  };

  handleClick = (event) => {
    const itemId = event.currentTarget.getAttribute('item-id');
    const categoryId = event.currentTarget.getAttribute('category-id');
    const url = `/categories/${categoryId}/items/${itemId}`;

    this.props.history.push(url);
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
              item-id={item.id}
              category-id={item.category.id}
              onClick={this.handleClick}
            >
              <div className="clearfix">
                {item.name}
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
  userId: PropTypes.number.isRequired,
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};


export default ItemListBody;
