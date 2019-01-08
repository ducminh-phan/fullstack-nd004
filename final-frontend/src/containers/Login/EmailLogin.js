import { connect } from 'react-redux';

import { emailLogin } from '../../actions/auth';
import EmailLogin from '../../components/Login/EmailLogin';


const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(emailLogin(email, password)),
});


export default connect(
  null,
  mapDispatchToProps,
)(EmailLogin);
