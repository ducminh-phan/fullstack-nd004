import { connect } from 'react-redux';

import CategoryListHead from './CategoryListHead';
import checkLoggedIn from '../../utils/auth';


const mapStateToProps = ({ auth }) => ({
  isLoggedIn: checkLoggedIn(auth),
});


export default connect(
  mapStateToProps,
)(CategoryListHead);
