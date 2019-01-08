import { connect } from 'react-redux';

import { googleLogin } from '../../actions/auth';
import GLogin from '../../components/Login/GoogleLogin';


const mapDispatchToProps = dispatch => ({
  login: token => dispatch(googleLogin(token)),
});


export default connect(
  null,
  mapDispatchToProps,
)(GLogin);