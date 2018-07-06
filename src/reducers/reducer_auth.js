
/////////////////////////////////////////////////////////////////////////
// fetch logic - BEGIN
/////////////////////////////////////////////////////////////////////////
// signup - fetch logic - BEGIN
import {
  FETCH_SIGNUP_SIGNIN_REQUEST,
  AUTH_USER,
  AUTH_ERROR
} from '../actions';


const INITIAL_STATE = {
  authenticated: localStorage.getItem('token'),
  authErrorMessage: '',
  isFetching: false
};

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {

    case FETCH_SIGNUP_SIGNIN_REQUEST:
      return {...state, isLoading: true };

    case AUTH_USER:
      return {
        ...state,
        authenticated: action.token,
        authErrorMessage: '',
        isLoading: false
      };

    case AUTH_ERROR:
      return {
        ...state,
        authErrorMessage: action.err,
        isLoading: false
      };

    default:
      return state;
  }
}
// signup with fetch logic - END
/////////////////////////////////////////////////////////////////////////
// fetch logic - END
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// axios logic - BEGIN
/////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////
// axios logic - END
/////////////////////////////////////////////////////////////////////////