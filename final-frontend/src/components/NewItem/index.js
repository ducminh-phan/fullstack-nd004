import { connect } from 'react-redux';

import NewItem from './NewItem';
import { addItem } from '../../actions/item';


const mapStateToProps = ({ categories, category }) => ({
  categories,
  selectedCategoryID: category.selectedCategoryID,
});


const mapDispatchToProps = dispatch => ({
  addItem: (categoryId, item) => dispatch(addItem(categoryId, item)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewItem);
