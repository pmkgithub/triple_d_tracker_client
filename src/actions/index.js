// import {
//   AUTH_USER,
//   AUTH_ERROR
// } from "./types";
import axios from 'axios';

// AUTH_USER type used by both "signup" and "signin"
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const signup = ( formProps, callback ) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/api/signup', formProps);

    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });

    localStorage.setItem("token", response.data.token);

    callback();

  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Email in use'
    })
  }
};

export const signin = ( formProps, callback ) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/api/signin', formProps);

    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });

    localStorage.setItem("token", response.data.token);

    callback();

  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Invalid Login Credentials'
    })
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  }
};