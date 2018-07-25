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
      return {
        ...state,
        modalView: action.modalView
      };

    default:
      return state;
  }
}