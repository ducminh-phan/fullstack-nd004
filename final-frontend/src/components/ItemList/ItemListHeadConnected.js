import { connect } from 'react-redux';

import ItemListHead from './ItemListHead';
import checkLoggedIn from '../../utils/auth';


const mapStateToProps = ({ auth }) => ({
  isLoggedIn: checkLoggedIn(auth),
});


export default connect(
  mapStateToProps,
)(ItemListHead);
