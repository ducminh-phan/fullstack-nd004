const STORAGE_TOKEN_KEY = 'access_token';
const STORAGE_USER_KEY = 'current_user';

function isValidResponse(authResponse) {
  return authResponse
    && authResponse.access_token
    && authResponse.user_id
    && authResponse.username;
}

class Storage {
  static clear() {
    localStorage.setItem(STORAGE_TOKEN_KEY, null);
    localStorage.setItem(STORAGE_USER_KEY, null);
  }

  static setToken(authResponse) {
    if (!isValidResponse(authResponse)) {
      return false;
    }

    Storage.clear();

    Storage.setAccessTokenFromResponse(authResponse);
    Storage.setUserFromResponse(authResponse);

    return true;
  }

  static setAccessToken(token) {
    const tokenString = token || '';
    localStorage.setItem(STORAGE_TOKEN_KEY, tokenString);
  }

  static setAccessTokenFromResponse(authResponse) {
    Storage.setAccessToken(authResponse.access_token);
  }

  static setUser(user) {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  }

  static setUserFromResponse(authResponse) {
    const user = {
      user: authResponse.user_id,
      name: authResponse.username,
    };

    Storage.setUser(user);
  }

  static getAccessToken() {
    return localStorage.getItem(STORAGE_TOKEN_KEY);
  }

  static getUser() {
    return JSON.parse(localStorage.getItem(STORAGE_USER_KEY));
  }

  static getUserID() {
    return Storage.getUser() && Storage.getUser().id;
  }

  static getUserName() {
    return Storage.getUser() && Storage.getUser().name;
  }

  static info() {
    return [Storage.getAccessToken(), Storage.getUser()];
  }
}

export default Storage;
export { STORAGE_TOKEN_KEY, STORAGE_USER_KEY };
