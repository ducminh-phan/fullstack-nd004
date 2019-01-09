import { LOGIN_SUCCESS, LOGOUT } from '../actions/auth';
import Storage from '../utils/storage';


// Set the initial state for authentication from localStorage
const initialAuthState = {
  token: Storage.getAccessToken(),
  user: Storage.getUser(),
};


export default (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case LOGOUT:
      return action.auth;
    default:
      return state;
  }
};
