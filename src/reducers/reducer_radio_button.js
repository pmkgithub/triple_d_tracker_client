import {
  SELECTED_RADIO_BUTTON
} from "../actions/action_radio_button";
import radioButtonConfig from '../configs/radioButtonConfig';

const initialState = {
  selectedRadioButton: radioButtonConfig.us
};

export default (state=initialState, action) => {
  switch (action.type) {

    case SELECTED_RADIO_BUTTON:
      return {
        ...state,
        selectedRadioButton: action.selectedRadioButton
      };

    default:
      return state;
  }
}