
/////////////////////////////////////////////////////////////////////////
// fetch logic - BEGIN
/////////////////////////////////////////////////////////////////////////
import { API_BASE_URL } from "../configs/config";

/////////////////////////////////////////////////////////////////////////
// signup - fetch syntax - BEGIN
/////////////////////////////////////////////////////////////////////////
export const signup = ( formProps, callback ) => dispatch => {
  dispatch(fetchSignupSigninRequest());
  fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(formProps)
  })
    .then(res => {
      // // This version of code generates error === "Unprocessable Entity"
      // // res.statusText === "Unprocessable Entity" What generates this text? I think this is Passport.
      // if (!res.ok) {
      //   return Promise.reject(res.statusText);
      // }
      // This version of code generates custom error message on the Client.
      // NOTE: res.json() here contains the error message generated on the API Server,
      // but we are instead creating an error message on the Client.
      if (!res.ok) {
        const customErrorMessage = 'Email already in use.';
        return Promise.reject(customErrorMessage)
      }
      return res.json();
    }).then(response => {
    // get token from response, place in localstorage.
    const token = response.token;
    const userId = response.userId;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    dispatch(authUser(token, userId));

    // redirect to protected resource.
    callback();

  }).catch(err => {
    dispatch(authError(err));
  });
};
/////////////////////////////////////////////////////////////////////////
// signup - fetch syntax - END
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
// signin - fetch syntax - BEGIN
/////////////////////////////////////////////////////////////////////////
export const signin = ( formProps, callback ) => dispatch => {
  dispatch(fetchSignupSigninRequest());
  fetch(`${API_BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(formProps)
  })
  .then(res => {
    // // This version of code generates error === "Unauthorized"
    // // res.statusText === "Unauthorized" What generates this text?
    // if (!res.ok) {
    //   return Promise.reject(res.statusText);
    // }
    // This version of code generates custom error message.
    if (!res.ok) {
      const customErrorMessage = 'Invalid Email or Password';
      return Promise.reject(customErrorMessage)
    }
    return res.json();
  })
  .then(response => {
    // get token from response, place in localstorage or keep token in Redux?
    const token = response.token;
    const userId = response.userId;

    // Place token in localStorage.  Later, token is placed into Redux in /reducers/reducer_auth.js.
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    dispatch(authUser(token, userId));

    // redirect to protected resource.
    callback();

  })
  .catch(err => {
    dispatch(authError(err));
  });
};
/////////////////////////////////////////////////////////////////////////
// signin - fetch syntax - END
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
// signout - fetch syntax - BEGIN
/////////////////////////////////////////////////////////////////////////
export const signout = () => {
  // localStorage.removeItem('token');
  localStorage.clear();
  window.location = '/';
  return {
    type: AUTH_USER,
    token: '',
    userId: ''
  }
};
/////////////////////////////////////////////////////////////////////////
// signout - fetch syntax - END
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
// common Action Creators - fetch syntax - BEGIN
// NOTE: These Action Creators are used by signup, signin, and signout.
//////////////////////////////////////////////////////////////////////////
export const FETCH_SIGNUP_SIGNIN_REQUEST = 'FETCH_SIGNUP_SIGNIN_REQUEST';
export const fetchSignupSigninRequest = () => ({
  type: FETCH_SIGNUP_SIGNIN_REQUEST,
});

export const AUTH_USER = 'AUTH_USER';
export const authUser = (token, userId) => ({
  type: AUTH_USER,
  token: token,
  userId: userId
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = (err) => ({
  type: AUTH_ERROR,
  err
});
//////////////////////////////////////////////////////////////////////////
// common Action Creators - fetch syntax - END
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
// fetch logic - END
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// axios logic - BEGIN
/////////////////////////////////////////////////////////////////////////
// import {
//   AUTH_USER,
//   AUTH_ERROR
// } from "./types";
// import axios from 'axios';

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

// // signin w/ axios syntax - BEGIN
// export const AUTH_USER = 'AUTH_USER';
// export const AUTH_ERROR = 'AUTH_ERROR';
// export const signin = ( formProps, callback ) => async dispatch => {
//   try {
//     const response = await axios.post('http://localhost:8080/api/signin', formProps);
//
//     console.log('formProps = ', formProps);
//     console.log('response = ', response);
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
//       payload: 'Invalid Login Credentials'
//     })
//   }
// };
// // signin w/ axios syntax - END

// // signout w/ axios syntax - BEGIN
// export const signout = () => {
//   localStorage.removeItem('token');
//
//   return {
//     type: AUTH_USER,
//     payload: ''
//   }
// };
// // signout w/ axios syntax - END
/////////////////////////////////////////////////////////////////////////
// axios logic - END
/////////////////////////////////////////////////////////////////////////