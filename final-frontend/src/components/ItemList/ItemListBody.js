import React, { Component } from 'react';
import { Button, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    const itemId = parseInt(event.currentTarget.getAttribute('item-id'), 10);
    const item = this.props.items.filter(it => (it.id === itemId))[0];

    this.props.deleteItem(item.category.id, itemId);
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
                <Link to={`/categories/${item.category.id}/items/${item.id}`}>
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
  userId: PropTypes.number.isRequired,
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};


export default ItemListBody;
