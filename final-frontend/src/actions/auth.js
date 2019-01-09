import { request } from '../utils/request';
import { showError } from './alert';
import Storage from '../utils/storage';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';


export const loginSuccess = (token, user) => ({
  type: LOGIN_SUCCESS,
  auth: {
    token,
    user,
  },
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
    error => (dispatch(showError(error))
    ),
  );


export const googleLogin = token => dispatch => request.post('/login/google', { token })
  .then(response => handleLoginSuccess(response, dispatch))
  .catch(
    error => (
      dispatch(showError(error))
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
