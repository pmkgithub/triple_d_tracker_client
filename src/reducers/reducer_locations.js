import {
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_ERROR,
  CENTER_MAP_ON_SINGLE_LOCATION,
  CLEAR_FILTERED_LOCATIONS_LIST,
  GET_ALL_LOCATIONS_FROM_CACHE,
  MAP_LISTED_LOCATIONS
} from "../actions/action_locations";
import mapConfig from '../configs/mapConfig';

const initialState = {
  locationsBeenFetched: false,
  cachedLocations: [],
  displayedMapLocations: [],
  filteredListLocations: [],
  mapCenterLat: mapConfig.us.lat,
  mapCenterLon: mapConfig.us.lon,
  mapZoom: mapConfig.us.zoom,
  mapSelectInputType: 'us',
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
        cachedLocations: action.locations,
        displayedMapLocations: action.locations,
        filteredListLocations: action.locations,
        isFetching: false,
        err: ""
      };

    case FETCH_LOCATIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        err: action.err
      };

    case GET_ALL_LOCATIONS_FROM_CACHE:
      return {
        ...state,
        mapCenterLat: mapConfig.us.lat,
        mapCenterLon: mapConfig.us.lon,
        mapZoom: mapConfig.us.zoom,
        displayedMapLocations: [...state.cachedLocations],
        filteredListLocations: [...state.cachedLocations],
      };

    case MAP_LISTED_LOCATIONS:
      return {
        ...state,
        mapCenterLat: mapConfig.us.lat,
        mapCenterLon: mapConfig.us.lon,
        mapZoom: mapConfig.us.zoom,
        displayedMapLocations: [...state.filteredListLocations],
      };

    case CENTER_MAP_ON_SINGLE_LOCATION:

      const location = state.cachedLocations.find(locationObj => {
        return (locationObj.name === action.recenterData.name)
        }
      );

      return {
        ...state,
        displayedMapLocations: [location],
        filteredListLocations: [...state.cachedLocations],
        mapCenterLat: action.recenterData.lat,
        mapCenterLon: action.recenterData.lon,
        mapZoom: action.recenterData.zoom,
      };

    case CLEAR_FILTERED_LOCATIONS_LIST:
      return {
        ...state,
        mapCenterLat: mapConfig.us.lat,
        mapCenterLon: mapConfig.us.lon,
        mapZoom: mapConfig.us.zoom,
        displayedMapLocations: [],
        filteredListLocations: []
      };

    default:
      return state;
  }
}