import {
  SET_IS_LOCATION_MODAL_OPEN,
  SET_IS_ADD_REVIEW_MODAL_OPEN,
  SET_LOCATION_ID,
} from '../actions/action_modals';

const initialState = {
  isLocationModalOpen: false,
  isAddReviewModalOpen: false,
  locationId: ''
};

export default (state=initialState, action) => {

  switch(action.type) {

    case SET_IS_LOCATION_MODAL_OPEN:
      return {
        ...state,
        isLocationModalOpen: action.isLocationModalOpen
      };

    case SET_IS_ADD_REVIEW_MODAL_OPEN:
      console.log('reducer_modals.js SET_IS_ADD_REVIEW_MODAL_OPEN action = ', action);
      return {
        ...state,
        isAddReviewModalOpen: action.isAddReviewModalOpen
      };

    case SET_LOCATION_ID:
      return {
        ...state,
        locationId: action.locationId
      };

    default:
      return state;
  }
}