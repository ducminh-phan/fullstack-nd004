import { connect } from 'react-redux';

import NewCategory from './NewCategory';
import addCategory from '../../actions/category';


const mapDispatchToProps = dispatch => ({
  addCategory: name => dispatch(addCategory(name)),
});


export default connect(
  null,
  mapDispatchToProps,
)(NewCategory);
