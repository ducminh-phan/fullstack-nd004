import { connect } from 'react-redux';

import { getItem } from '../../actions/item';
import Item from './Item';


const mapStateToProps = (state) => ({ item: state.item });


const mapDispatchToProps = dispatch => ({
  getItem: (categoryId, itemId) => dispatch(getItem(categoryId, itemId)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Item);
