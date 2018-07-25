import {
  FETCH_CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_ERROR,
  CREATE_REVIEW_SUCCESS,
  SET_REVIEWS_ON_SIGNIN
} from '../actions/action_reviews';

const initialState = {
  reviews: [{foo: 'bar'}],
  createReviewErrorMessage: '',
};

export default (state=initialState, action) => {

  switch(action.type) {

    case SET_REVIEWS_ON_SIGNIN:
      console.log('SET_REVIEWS_ON_SIGNIN action , ', action);
      return {
        ...state,
        reviews: [...action.reviews]
      };

    case FETCH_CREATE_REVIEW_REQUEST:
      console.log('FETCH_CREATE_REVIEW_REQUEST action = ', action);
      return {...state, isFetching: true };

    // TODO - add the returned review, and visitedLocation to Redux.
    case CREATE_REVIEW_SUCCESS:
      console.log('CREATE_REVIEW_SUCCESS action = ', action);
      return {
        ...state,

      };

    case CREATE_REVIEW_ERROR:
      console.log('CREATE_REVIEW_ERROR action = ', action);
      return {
        ...state,
        createReviewErrorMessage: action.err,
        isFetching: false
      };

    default:
      return state;
  }
}