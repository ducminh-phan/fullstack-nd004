import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';


/**
 * @return {null}
 */
function ItemHead(props) {
  if (props.isLoggedIn) {
    return (
      <div id="item-list-top">
        <LinkContainer to="/new-item">
          <Button>Add Item</Button>
        </LinkContainer>
      </div>
    );
  }

  return null;
}


ItemHead.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};


export default ItemHead;
