import {
  SET_MAP_SELECT_INPUT_TYPE
} from "../actions/action_map_select_input";
import mapSelectInputConfig from '../configs/mapSelectInputConfig';

const initialState = {
  mapSelectInputType: mapSelectInputConfig.us
};

export default (state=initialState, action) => {
  switch (action.type) {

    case SET_MAP_SELECT_INPUT_TYPE:
      console.log('reducer_set_map_select_input action = ', action.mapSelectInputType);
      return {
        ...state,
        mapSelectInputType: action.mapSelectInputType
      };

    default:
      return state;
  }
}