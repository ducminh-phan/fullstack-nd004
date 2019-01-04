import Storage from './storage';

class Auth {
  static isAuthenticated() {
    const token = Storage.getAccessToken();
    const user = Storage.getUser();

    return !!(token && user);
  }
}

export default Auth;
