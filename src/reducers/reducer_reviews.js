import {
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_ERROR,

  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_ERROR,
  CREATE_REVIEW_SUCCESS,

  SET_REVIEW_TO_EDIT,


  EDIT_REVIEW_REQUEST,
  EDIT_REVIEW_SUCCESS,
  EDIT_REVIEW_ERROR,

  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_ERROR,

  SET_REVIEWS,
  // TODO - SET_RERENDER_MAP_BOOL -> delete if not needed.
  SET_RERENDER_MAP_BOOL
  // // TODO - HAS_EDIT_REVIEW_FORM_OPENED -> delete if not needed.
  // HAS_EDIT_REVIEW_FORM_OPENED,
} from '../actions/action_reviews';

const initialState = {
  isFetching: false,
  reviews: [],
  reviewToEdit: {},
  fetchReviewsErrorMessage: '',
  fetchReviewToEditErrorMessage: '',
  createReviewErrorMessage: '',
  editReviewErrorMessage: '',
  deleteReviewsErrorMessage: '',
  // rerenderMapBool: false, // TODO - SET_RERENDER_MAP_BOOL -> delete if not needed.
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

    // edit review - BEGIN
    case SET_REVIEW_TO_EDIT:
      return {
        ...state,
        reviewToEdit: action.reviewToEdit
      };

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

    // TODO - SET_RERENDER_MAP_BOOL -> delete if not needed.
    case SET_RERENDER_MAP_BOOL:
      console.log('SET_RERENDER_MAP_BOOL action = ', action);
      return {
        ...state,
        rerenderMapBool: action.bool
      };

    //   // TODO - HAS_EDIT_REVIEW_FORM_OPENED -> delete if not needed.
    // // Controls re-populating EditReviewForm form the first time EditReviewForm
    // // has been opened.
    // case HAS_EDIT_REVIEW_FORM_OPENED:
    //   return {
    //     ...state,
    //     hasEditReviewFormOpened: action.bool
    //   };

    default:
      return state;
  }
}