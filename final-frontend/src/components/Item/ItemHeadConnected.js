import { connect } from 'react-redux';

import ItemHead from './ItemHead';
import checkLoggedIn from '../../utils/auth';


const mapStateToProps = ({ auth }) => ({
  isLoggedIn: checkLoggedIn(auth),
});


export default connect(
  mapStateToProps,
)(ItemHead);
