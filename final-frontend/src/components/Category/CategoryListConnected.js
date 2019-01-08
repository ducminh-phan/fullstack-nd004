import { connect } from 'react-redux';

import { selectCategory } from '../../actions/category';
import CategoryList from './CategoryList';


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
)(CategoryList);
