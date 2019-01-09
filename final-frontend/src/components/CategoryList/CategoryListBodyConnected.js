import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CategoryListBody from './CategoryListBody';


const mapStateToProps = ({ categories }) => ({
  categories,
});


export default withRouter(connect(
  mapStateToProps,
)(CategoryListBody));
