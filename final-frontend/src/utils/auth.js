function checkLoggedIn(auth) {
  return !!(auth.token && auth.user);
}

export default checkLoggedIn;
