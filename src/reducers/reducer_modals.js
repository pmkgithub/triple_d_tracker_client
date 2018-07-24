import {
  SET_IS_MODAL_OPEN,
  SET_MODAL_VIEW,
  SET_LOCATION_ID,
} from '../actions/action_modals';

const initialState = {
  isModalOpen: false,
  modalView: 'location_detail',
  locationId: ''
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

    case SET_LOCATION_ID:
      return {
        ...state,
        locationId: action.locationId
      };

    default:
      return state;
  }
}