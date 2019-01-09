import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ItemListBody from './ItemListBody';
import checkLoggedIn from '../../utils/auth';
import { deleteItem } from '../../actions/item';


const mapStateToProps = ({ items, auth }) => ({
  items,
  userId: checkLoggedIn(auth) ? auth.user.id : 0,
});


const mapDispatchToProps = dispatch => ({
  deleteItem: (categoryId, itemId) => dispatch(deleteItem(categoryId, itemId)),
});


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemListBody));
