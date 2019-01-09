import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getItems } from '../../actions/items';
import CategoryListBody from './CategoryListBody';


const mapStateToProps = ({ categories }) => ({
  categories,
});


const mapDispatchToProps = dispatch => ({
  getItems: categoryId => dispatch(getItems(categoryId)),
});


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryListBody));
