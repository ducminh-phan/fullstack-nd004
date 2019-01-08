import { request } from '../utils/request';
import Storage from '../utils/storage';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';


export const loginSuccess = (token, user) => ({
  type: LOGIN_SUCCESS,
  auth: {
    token,
    user,
  },
});


export const loginFailure = message => ({
  type: LOGIN_FAILURE,
  message,
});


function handleLoginSuccess(response, dispatch) {
  Storage.setToken(response.data);

  dispatch(
    loginSuccess(
      response.data.access_token,
      {
        id: response.data.user_id,
        name: response.data.username,
      },
    ),
  );
}


export const emailLogin = (email, password) => dispatch => request.post('/login', { email, password })
  .then(response => handleLoginSuccess(response, dispatch))
  .catch(
    error => (
      dispatch(loginFailure(error.message))
    ),
  );


export const googleLogin = token => dispatch => request.post('/login/google', { token })
  .then(response => handleLoginSuccess(response, dispatch))
  .catch(
    error => (
      dispatch(loginFailure(error.message))
    ),
  );


export const logout = () => (
  {
    type: LOGOUT,
    auth:
      {
        token: null,
        user: null,
      },
  }
);
