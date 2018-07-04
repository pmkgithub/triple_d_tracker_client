import {
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_ERROR
} from "../actions/locations";

const initialState = {
  locations: [],
  isFetching: false,
  err: ""
};

export default (state=initialState, action) => {
  switch (action.type) {

    case FETCH_LOCATIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case FETCH_LOCATIONS_SUCCESS:
      console.log('FETCH_LOCATIONS_SUCCESS state', state);
      console.log('FETCH_LOCATIONS_SUCCESS action', action);
      return {
        ...state,
        isFetching: false,
        locations: action.locations,
        err: ""
      };

    case FETCH_LOCATIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        err: action.err
      };

    default:
      return state;
  }
}