import {
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_ERROR,

  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_ERROR,
  CREATE_REVIEW_SUCCESS,

  SET_REVIEW_TO_EDIT_ID,
  FETCH_REVIEW_TO_EDIT_REQUEST,
  FETCH_REVIEW_TO_EDIT_SUCCESS,
  FETCH_REVIEW_TO_EDIT_ERROR,
  SET_REVIEW_TO_EDIT,

  EDIT_REVIEW_REQUEST,
  EDIT_REVIEW_SUCCESS,
  EDIT_REVIEW_ERROR,

  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_ERROR,
  SET_REVIEWS,
} from '../actions/action_reviews';

const initialState = {
  isFetching: false,
  reviews: [],
  reviewToEditId: '',
  reviewToEdit: {},
  fetchReviewsErrorMessage: '',
  fetchReviewToEditErrorMessage: '',
  createReviewErrorMessage: '',
  editReviewErrorMessage: '',
  deleteReviewsErrorMessage: '',
};

export default (state=initialState, action) => {

  switch(action.type) {

    // fetch reviews - BEGIN
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
    // fetch reviews - END

    // create review - BEGIN
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
    // create review - END

    // EDIT REVIEW - BEGIN
    // fetch review to edit - BEGIN
    case SET_REVIEW_TO_EDIT_ID:
      console.log('reducer_reviews.js SET_REVIEW_TO_EDIT_ID action = ', action);
      return {
        ...state,
        reviewToEditId: action.reviewToEditId
      };
    case FETCH_REVIEW_TO_EDIT_REQUEST:
      return {...state, isFetching: true };

    case FETCH_REVIEW_TO_EDIT_SUCCESS:
      return {
        ...state,
        isFetching: false
      };

    case FETCH_REVIEW_TO_EDIT_ERROR:
      return {
        ...state,
        fetchReviewToEditErrorMessage: action.err,
        isFetching: false
      };

    case SET_REVIEW_TO_EDIT:
      console.log('reducers_reviews.js SET_REVIEW_TO_EDIT action = ', action);
      return {
        ...state,
        reviewToEdit: action.reviewToEdit
      };
    // fetch review to edit - END

    // edit review - BEGIN
    case EDIT_REVIEW_REQUEST:
      return {...state, isFetching: true };

    case EDIT_REVIEW_SUCCESS:
      return {
        ...state,
        isFetching: false
      };

    case EDIT_REVIEW_ERROR:
      return {
        ...state,
        editReviewErrorMessage: action.err,
        isFetching: false
      };
    // edit review -END
    // EDIT REVIEW - END

    // delete review - BEGIN
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
    // delete review - END

    // misc.
    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.reviews
      };

    default:
      return state;
  }
}