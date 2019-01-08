import { connect } from 'react-redux';

import CategoryHead from './CategoryHead';
import checkLoggedIn from '../../utils/auth';


const mapStateToProps = ({ auth }) => ({
  isLoggedIn: checkLoggedIn(auth),
});


export default connect(
  mapStateToProps,
)(CategoryHead);
