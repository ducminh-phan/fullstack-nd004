import { connect } from 'react-redux';

import { googleLogin } from '../../actions/auth';
import { showAlert } from '../../actions/alert';
import GLogin from './GoogleLogin';


const mapDispatchToProps = dispatch => ({
  login: token => dispatch(googleLogin(token)),
  showAlert: (type, message) => dispatch(showAlert(type, message)),
});


export default connect(
  null,
  mapDispatchToProps,
)(GLogin);
