import { connect } from 'react-redux';

import { selectCategory } from '../../actions/category';
import CategoryListBody from './CategoryListBody';


const mapStateToProps = ({ categories, category }) => ({
  categories,
  selectedCategoryID: category.selectedCategoryID,
});


const mapDispatchToProps = dispatch => ({
  selectCategory: categoryId => dispatch(selectCategory(categoryId)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryListBody);
