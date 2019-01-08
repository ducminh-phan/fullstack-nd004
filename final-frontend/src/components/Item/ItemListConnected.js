import { connect } from 'react-redux';

import ItemList from './ItemList';
import checkLoggedIn from '../../utils/auth';
import { deleteItem } from '../../actions/item';


const mapStateToProps = ({ category, auth }) => ({
  items: category ? category.items : [],
  selectedCategoryID: category.selectedCategoryID,
  userId: checkLoggedIn(auth) ? auth.user.id : 0,
});


const mapDispatchToProps = dispatch => ({
  deleteItem: (categoryId, itemId) => dispatch(deleteItem(categoryId, itemId)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemList);
