class Auth {
  static loggedIn() {
    return !!sessionStorage.jwt;
  }

  static logOut() {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('user');
  }
}

export default Auth;
