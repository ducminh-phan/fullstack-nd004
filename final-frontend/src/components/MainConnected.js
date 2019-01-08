import { connect } from 'react-redux';

import { getCategories } from '../actions/categories';
import Main from './Main';


const mapStateToProps = ({ categories = [], category }) => (
  {
    categories,
    category,
  }
);


const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
