import {
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_ERROR,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_ERROR,
  CREATE_REVIEW_SUCCESS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_ERROR,
  SET_REVIEWS,
} from '../actions/action_reviews';

const initialState = {
  isFetching: false,
  reviews: [],
  fetchReviewsErrorMessage: '',
  createReviewErrorMessage: '',
  deleteReviewsErrorMessage: ''
};

export default (state=initialState, action) => {

  switch(action.type) {

    case FETCH_REVIEWS_REQUEST:
      return {...state, isFetching: true };

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

    case CREATE_REVIEW_REQUEST:
      return {...state, isFetching: true };

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

    case DELETE_REVIEW_REQUEST:
      return {...state, isFetching: true };

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        isFetching: false
      };

    case DELETE_REVIEW_ERROR:
      return {
        ...state,
        deleteReviewErrorMessage: action.err,
        isFetching: false
      };

    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.reviews
      };

    default:
      return state;
  }
}