import {
  SET_IS_MODAL_OPEN,
  SET_LOCATION_ID,
} from '../actions/action_modal';

const initialState = {
  isModalOpen: false,
  locationId: ''
};

export default (state=initialState, action) => {

  switch(action.type) {

    case SET_IS_MODAL_OPEN:
      return {
        ...state,
        isModalOpen: action.isModalOpen
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