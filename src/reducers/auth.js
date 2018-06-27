
// // signup and signin w/ axios reducer - BEGIN
// import { AUTH_USER, AUTH_ERROR } from '../actions/types';
//
// const INITIAL_STATE = {
//   authenticated: '',
//   errorMessage: ''
// };
//
// export default (state=INITIAL_STATE, action) => {
//
//   switch (action.type) {
//
//     case AUTH_USER:
//       return {...state, authenticated: action.payload};
//
//     case AUTH_ERROR:
//       return {...state, errorMessage: action.payload};
//
//     default:
//       return state;
//   }
// }
// // signup and signin w/ axios reducer - END

// signup with fetch logic - BEGIN
import {
  FETCH_SIGNUP_REQUEST,
  // FETCH_SIGNIN_REQUEST,
  FETCH_SIGNUP_SUCCESS,
  FETCH_SIGNUP_ERROR,
  // AUTH_USER,
  // AUTH_ERROR
} from '../actions';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  isFetching: false
};

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {

    case FETCH_SIGNUP_REQUEST:
      console.log('case FETCH_SIGNUP_REQUEST executed');
      return {...state, isLoading: true };

    case FETCH_SIGNUP_SUCCESS:
      console.log('case FETCH_SIGNUP_SUCCESS executed');
      console.log('action.token =', action.token);
      return {
        ...state,
        authenticated: action.token,
        isLoading: false
      };

    case FETCH_SIGNUP_ERROR:
      return {
        ...state,
        errorMessage: action.err
      };

    // case FETCH_SIGNIN_REQUEST:
    //   console.log('case FETCH_SIGNIN_REQUEST executed');
    //   return {...state, isLoading: true };

    // case AUTH_USER:
    //   console.log('case FETCH_SIGNUP_SUCCESS executed');
    //   console.log('action.token =', action.token);
    //   return {
    //     ...state,
    //     authenticated: action.token,
    //     isLoading: false
    //   };
    //
    // case AUTH_ERROR:
    //   return {
    //     ...state,
    //     errorMessage: action.err
    //   };

    default:
      return state;
  }
}
// signup with fetch logic - END
