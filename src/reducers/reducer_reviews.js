import {
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_ERROR,
  CREATE_REVIEW_SUCCESS,
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_ERROR,
  SET_REVIEWS,

} from '../actions/action_reviews';

const initialState = {
  isFetching: false,
  reviews: [],
  createReviewErrorMessage: '',
  fetchReviewsErrorMessage: ''
};

export default (state=initialState, action) => {

  switch(action.type) {

    case SET_REVIEWS:
      console.log('SET_REVIEWS action , ', action);
      return {
        ...state,
        reviews: action.reviews
      };

    case CREATE_REVIEW_REQUEST:
      return {...state, isFetching: true };

    // TODO - When a review is successfully saved, do what?
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        isFetching: false
      };

    case CREATE_REVIEW_ERROR:
      return {
        ...state,
        createReviewErrorMessage: action.err,
        isFetching: false
      };


    case FETCH_REVIEWS_REQUEST:
      return {...state, isFetching: true };

    // TODO - When a reviews are successfully fetched, do what?
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        isFetching: false
      };

    case FETCH_REVIEWS_ERROR:
      return {
        ...state,
        fetchReviewsErrorMessage: action.err,
        isFetching: false
      };

    default:
      return state;
  }
}