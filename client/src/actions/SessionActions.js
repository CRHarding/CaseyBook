import * as types from './actionTypes';
import sessionApi from '../services/SessionApi';
import auth from '../auth/authenticator';

export function loginUser(credentials) {
  return function(dispatch) {
    return sessionApi
      .login(credentials)
      .then(response => {
        const jwt = response.data.jwt;
        const user = response.data.user;
        const name = user.name;
        sessionStorage.setItem('jwt', jwt);
        sessionStorage.setItem('user_id', user.id);
        sessionStorage.setItem('name', name);
        dispatch(loginSuccess());
      })
      .catch(err => {
        throw err;
      });
  };
}

export function signupUser(credentials) {
  return function(dispatch) {
    return sessionApi
      .signup(credentials)
      .then(response => {
        const jwt = response.data.jwt;
        const user = response.data.user;
        sessionStorage.setItem('jwt', jwt);
        sessionStorage.setItem('user', user);
        dispatch(signupSuccess());
      })
      .catch(err => {
        throw err;
      });
  };
}

export function logOutUser() {
  auth.logOut();
  return { type: types.LOG_OUT };
}

export function loginSuccess() {
  return { type: types.LOG_IN_SUCCESS };
}

export function signupSuccess() {
  return { type: types.SIGNUP_SUCCESS };
}
