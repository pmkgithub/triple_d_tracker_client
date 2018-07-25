import {
  SET_IS_MODAL_OPEN,
  SET_MODAL_VIEW,
  // FETCH_CREATE_REVIEW_REQUEST,
  // CREATE_REVIEW_ERROR,
  // CREATE_REVIEW_SUCCESS,
} from '../actions/action_modal';

const initialState = {
  isModalOpen: false,
  modalView: 'location_detail',
  // locationId: '',
  isFetching: false,
  // createReviewErrorMessage: '',
};

export default (state=initialState, action) => {

  switch(action.type) {

    case SET_IS_MODAL_OPEN:
      return {
        ...state,
        isModalOpen: action.isModalOpen
      };

    case SET_MODAL_VIEW:
      console.log('SET_MODAL_VIEW action = ', action);
      return {
        ...state,
        modalView: action.modalView
      };

      // TODO - delete after posting review logic working.
    // case FETCH_CREATE_REVIEW_REQUEST:
    //   console.log('FETCH_CREATE_REVIEW_REQUEST action = ', action);
    //   return {...state, isFetching: true };

    // // TODO - add the returned review, and visitedLocation to Redux.
    // case CREATE_REVIEW_SUCCESS:
    //   console.log('CREATE_REVIEW_SUCCESS action = ', action);
    //   return {
    //     ...state,
    //
    //   };

    // case CREATE_REVIEW_ERROR:
    //   console.log('CREATE_REVIEW_ERROR action = ', action);
    //   return {
    //     ...state,
    //     createReviewErrorMessage: action.err,
    //     isFetching: false
    //   };

    default:
      return state;
  }
}