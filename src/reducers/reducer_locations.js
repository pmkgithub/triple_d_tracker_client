import {
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_ERROR,
  CENTER_MAP_ON_LOCATION
} from "../actions/locations";
import mapConfig from '../map_config/mapConfig';

const initialState = {
  locationsBeenFetched: false,
  locations: [],
  mapCenterLat: mapConfig.us.lat,
  mapCenterLon: mapConfig.us.lon,
  mapZoom: mapConfig.us.zoom,
  displayedLocations: [],
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
      return {
        ...state,
        locationsBeenFetched: true,
        locations: action.locations,
        displayedLocations: action.locations,
        isFetching: false,
        err: ""
      };

    case FETCH_LOCATIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        err: action.err
      };

    case CENTER_MAP_ON_LOCATION:
      console.log('CENTER_MAP_ON_LOCATION ran');
      console.log('action = ', action);
      return {
        ...state,
        mapCenterLat: action.recenterData.lat,
        mapCenterLon: action.recenterData.lon,
        mapZoom: action.recenterData.zoom,
      };

    default:
      return state;
  }
}