import {
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_ERROR,
  SET_MAP_GEO_CENTER,
  MAP_SINGLE_LOCATIONS_FROM_UI_LIST,
  MAP_ALL_LOCATIONS_FROM_UI_LIST,
  CLEAR_LOCATIONS_FROM_UI_LIST,
  CREATE_US_LOCATIONS_UI_LIST,
  CREATE_STATE_LOCATIONS_UI_LIST

} from "../actions/action_locations";
import mapConfig from '../configs/mapConfig';
import stateNameToAbbr from '../configs/stateNameToAbbrConfig';

const initialState = {
  locationsBeenFetched: false,
  cachedLocations: [],
  displayedMapLocations: [],
  filteredListLocations: [],
  mapGeoCenter: 'US',
  mapCenterLat: mapConfig.US.lat,
  mapCenterLon: mapConfig.US.lon,
  mapZoom: mapConfig.US.zoom,
  isFetching: false,
  err: ""
};

export default (state=initialState, action) => {

  let lat, lon, zoom, stateCode;

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

    case SET_MAP_GEO_CENTER:
      return {
        ...state,
        mapGeoCenter: action.geoCenter
      };

    case CLEAR_LOCATIONS_FROM_UI_LIST:
      return {
        ...state,
        mapCenterLat: mapConfig.US.lat,
        mapCenterLon: mapConfig.US.lon,
        mapZoom: mapConfig.US.zoom,
        displayedMapLocations: [],
        filteredListLocations: []
      };

    case CREATE_US_LOCATIONS_UI_LIST:
      return {
        ...state,
        displayedMapLocations: [...state.cachedLocations],
        filteredListLocations: [...state.cachedLocations],
        mapCenterLat: mapConfig.US.lat,
        mapCenterLon: mapConfig.US.lon,
        mapZoom: mapConfig.US.zoom,
      };

    case CREATE_STATE_LOCATIONS_UI_LIST:

      stateCode = stateNameToAbbr[action.stateName];

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

    case MAP_SINGLE_LOCATIONS_FROM_UI_LIST:

      const location = state.cachedLocations.find(locationObj => {
          return (locationObj.name === action.recenterData.name)
        }
      );

      return {
        ...state,
        displayedMapLocations: [location],
        mapCenterLat: action.recenterData.lat,
        mapCenterLon: action.recenterData.lon,
        mapZoom: action.recenterData.zoom,
      };

    case MAP_ALL_LOCATIONS_FROM_UI_LIST:

      if( action.geoCenter === 'US' ) {
        lat= mapConfig.US.lat;
        lon= mapConfig.US.lon;
        zoom= mapConfig.US.zoom;

      } else if ( action.geoCenter === 'nearme') {
        // future code.
      } else {
        // handles any geoCenter containing a US State's name.
        stateCode = stateNameToAbbr[action.geoCenter];
        lat = mapConfig[stateCode].lat;
        lon = mapConfig[stateCode].lon;
        zoom = mapConfig[stateCode].zoom;
      }

      return {
        ...state,
        mapCenterLat: lat,
        mapCenterLon: lon,
        mapZoom: zoom,
        displayedMapLocations: [...state.filteredListLocations],
      };

    default:
      return state;
  }
}