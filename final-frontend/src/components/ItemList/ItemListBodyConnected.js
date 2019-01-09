import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ItemListBody from './ItemListBody';
import checkLoggedIn from '../../utils/auth';
import { deleteItem } from '../../actions/item';
import { getItems, getLatestItems } from '../../actions/items';


const mapStateToProps = ({ items, auth }) => ({
  items,
  userId: checkLoggedIn(auth) ? auth.user.id : 0,
});


const mapDispatchToProps = dispatch => ({
  getItems: (categoryId) => {
    if (categoryId) {
      // Get all items in the category
      dispatch(getItems(categoryId));
    } else {
      // categoryId is undefined, get latest items
      dispatch(getLatestItems());
    }
  },
  deleteItem: (categoryId, itemId) => dispatch(deleteItem(categoryId, itemId)),
});


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemListBody));
