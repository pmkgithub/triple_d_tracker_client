import {
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_ERROR,
  MAP_SINGLE_LOCATION_FROM_LIST,
  MAP_ALL_LOCATIONS_FROM_LIST,
  CLEAR_LOCATIONS_FROM_LIST,
  CREATE_US_LOCATIONS_LIST,
  CREATE_STATE_LOCATIONS_LIST,
  // GET_ALL_LOCATIONS_FROM_CACHE

} from "../actions/action_locations";
import mapConfig from '../configs/mapConfig';
import stateNameToAbbr from '../configs/stateNameToAbbrConfig';

const initialState = {
  locationsBeenFetched: false,
  cachedLocations: [],
  displayedMapLocations: [],
  filteredListLocations: [],
  mapCenterLat: mapConfig.US.lat,
  mapCenterLon: mapConfig.US.lon,
  mapZoom: mapConfig.US.zoom,
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

    case CLEAR_LOCATIONS_FROM_LIST:
      return {
        ...state,
        mapCenterLat: mapConfig.US.lat,
        mapCenterLon: mapConfig.US.lon,
        mapZoom: mapConfig.US.zoom,
        displayedMapLocations: [],
        filteredListLocations: []
      };

    case CREATE_US_LOCATIONS_LIST:
      return {
        ...state,
        displayedMapLocations: [...state.cachedLocations],
        filteredListLocations: [...state.cachedLocations],
        mapCenterLat: mapConfig.US.lat,
        mapCenterLon: mapConfig.US.lon,
        mapZoom: mapConfig.US.zoom,
      };

    case CREATE_STATE_LOCATIONS_LIST:
      const stateCode = stateNameToAbbr[action.stateName];

      const locations = state.cachedLocations.filter((location) => {
        return location.state === stateCode;
      });

      return {
        ...state,
        displayedMapLocations: [...locations],
        filteredListLocations: [...locations],
        mapCenterLat: mapConfig[stateCode].lat,
        mapCenterLon: mapConfig[stateCode].lon,
        mapZoom: mapConfig[stateCode].zoom,
      };

    case MAP_SINGLE_LOCATION_FROM_LIST:

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

    case MAP_ALL_LOCATIONS_FROM_LIST:
      console.log('reducer_locations.js MAP_ALL_LOCATIONS_FROM_LIST state = ', state);
      return {
        ...state,
        mapCenterLat: mapConfig.US.lat,
        mapCenterLon: mapConfig.US.lon,
        mapZoom: mapConfig.US.zoom,
        displayedMapLocations: [...state.filteredListLocations],
      };

      // undecided - BEGIN
    // case GET_ALL_LOCATIONS_FROM_CACHE:
    //   return {
    //     ...state,
    //     mapCenterLat: mapConfig.US.lat,
    //     mapCenterLon: mapConfig.US.lon,
    //     mapZoom: mapConfig.US.zoom,
    //     displayedMapLocations: [...state.cachedLocations],
    //     filteredListLocations: [...state.cachedLocations],
    //   };


    // undecided - END

    default:
      return state;
  }
}