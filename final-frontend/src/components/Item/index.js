import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getItem } from '../../actions/item';
import Item from './Item';


const mapStateToProps = state => ({ item: state.item });


const mapDispatchToProps = dispatch => ({
  getItem: (categoryId, itemId) => dispatch(getItem(categoryId, itemId)),
});


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Item));
