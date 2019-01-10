import { connect } from 'react-redux';

import { emailLogin } from '../../actions/auth';
import EmailLogin from './EmailLogin';


const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(emailLogin(email, password)),
});


export default connect(
  null,
  mapDispatchToProps,
)(EmailLogin);
