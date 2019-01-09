import { connect } from 'react-redux';

import UserAuth from './UserAuth';
import { logout } from '../../actions/auth';
import checkLoggedIn from '../../utils/auth';


const mapStateToProps = ({ auth }) => ({
  isLoggedIn: checkLoggedIn(auth),
  username: auth.user ? auth.user.name : '',
});


const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAuth);
