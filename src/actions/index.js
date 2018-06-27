// import {
//   AUTH_USER,
//   AUTH_ERROR
// } from "./types";
import axios from 'axios';

// // signup w/ axios syntax - BEGIN
// // AUTH_USER type used by both "signup" and "signin"
// export const AUTH_USER = 'AUTH_USER';
// export const AUTH_ERROR = 'AUTH_ERROR';
// export const signup = ( formProps, callback ) => async dispatch => {
//   try {
//     const response = await axios.post('http://localhost:8080/api/signup', formProps);
//     console.log('formProps = ', formProps);
//     dispatch({
//       type: AUTH_USER,
//       payload: response.data.token
//     });
//
//     localStorage.setItem("token", response.data.token);
//
//     callback();
//
//   } catch (e) {
//     dispatch({
//       type: AUTH_ERROR,
//       payload: 'Email in use'
//     })
//   }
// };
// // signup w/ axios syntax - END

// signup w/ fetch syntax - BEGIN
export const signup = ( formProps, callback ) => dispatch => {
  console.log('formProps = ', formProps);
  console.log('callback = ', callback);
  console.log('JSON.stringify(formProps) = ', JSON.stringify(formProps));
  dispatch(fetchSignupRequest());
  fetch('http://localhost:8080/api/signup', {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(formProps)
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  }).then(response => {
    // get token from response, place in localstorage.
    const token = response.token;
    localStorage.setItem("token", token);
    dispatch(fetchSignupSuccess(token));

    // redirect to protected resource.
    callback();

  }).catch(err => {
    dispatch(fetchSignupError(err));
  });
};

export const FETCH_SIGNUP_REQUEST = 'FETCH_SIGNUP_REQUEST';
export const fetchSignupRequest = () => ({
  type: FETCH_SIGNUP_REQUEST,
});

export const FETCH_SIGNUP_SUCCESS = 'FETCH_SIGNUP_SUCCESS';
export const fetchSignupSuccess = (token) => ({
  type: FETCH_SIGNUP_SUCCESS,
  token
});

export const FETCH_SIGNUP_ERROR = 'FETCH_SIGNUP_ERROR';
export const fetchSignupError = (err) => ({
  type: FETCH_SIGNUP_ERROR,
  err
});
// signup fetch syntax - END

// signin w/ axios syntax - BEGIN
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const signin = ( formProps, callback ) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/api/signin', formProps);

    console.log('formProps = ', formProps);
    console.log('response = ', response);
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
// signin w/ axios syntax - END

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  }
};