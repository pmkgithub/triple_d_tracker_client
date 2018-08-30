
/////////////////////////////////////////////////////////////////////////
// fetch logic - BEGIN
/////////////////////////////////////////////////////////////////////////
// signup - fetch logic - BEGIN
import {
  FETCH_SIGNUP_SIGNIN_REQUEST,
  AUTH_USER,
  AUTH_ERROR
} from '../actions';

// setting authenticated here, allows user on signup to access protected resources.
// TODO - is setting authenticated in initialState needed?
const INITIAL_STATE = {
  // authenticated: '',
  authenticated: localStorage.getItem('token'),
  // Dev - user b@b.com
  // userId: '5b578696527db520e24a7bc2',
  // Production
  userId: '',
  authErrorMessage: '',
  isFetching: false
};

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {

    case FETCH_SIGNUP_SIGNIN_REQUEST:
      return {...state, isFetching: true };

    case AUTH_USER:
      return {
        ...state,
        authenticated: action.token,
        userId: action.userId,
        authErrorMessage: '',
        isFetching: false
      };

    case AUTH_ERROR:
      return {
        ...state,
        authErrorMessage: action.err,
        isFetching: false
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