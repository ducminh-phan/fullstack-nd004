import { connect } from 'react-redux';

import LoginForm from '../../components/Login';
import formWrapper from '../../utils/wrappers/formWrapper';
import checkLoggedIn from '../../utils/auth';


const mapStateToProps = ({ auth }) => ({
  isLoggedIn: checkLoggedIn(auth),
});


const LoginContainer = connect(
  mapStateToProps,
)(LoginForm);


const Login = formWrapper(LoginContainer);


export default Login;
