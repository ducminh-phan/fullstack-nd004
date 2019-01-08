import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';


/**
 * @return {null}
 */
function CategoryHead(props) {
  if (props.isLoggedIn) {
    return (
      <div id="category-list-top">
        <LinkContainer to="/new-category">
          <Button>Add Category</Button>
        </LinkContainer>
      </div>
    );
  }

  return null;
}


CategoryHead.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};


export default CategoryHead;
