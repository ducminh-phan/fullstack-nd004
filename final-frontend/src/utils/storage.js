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

    Storage.setAccessToken(authResponse);
    Storage.setUser(authResponse);

    return true;
  }

  static setAccessToken(authResponse) {
    localStorage.setItem(STORAGE_TOKEN_KEY, authResponse.access_token);
  }

  static setUser(authResponse) {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify({
      user_id: authResponse.user_id,
      username: authResponse.username,
    }));
  }

  static getAccessToken() {
    return localStorage.getItem(STORAGE_TOKEN_KEY);
  }

  static getUser() {
    return JSON.parse(localStorage.getItem(STORAGE_USER_KEY));
  }

  static info() {
    return [Storage.getAccessToken(), Storage.getUser()];
  }
}

export default Storage;
