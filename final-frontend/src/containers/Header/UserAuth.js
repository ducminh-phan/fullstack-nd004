import { connect } from 'react-redux';

import UserAuth from '../../components/Header/UserAuth';
import { logout } from '../../actions/auth';
import checkLoggedIn from '../../utils/auth';


const mapStateToProps = ({ auth }) => ({
  isLoggedIn: checkLoggedIn(auth),
  username: auth.user ? auth.user.username : '',
});


const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAuth);
