import {
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_ERROR,
  SET_VISITED_LOCATIONS_ON_SIGNIN,
  SET_MAP_GEO_CENTER,
  SET_LAT_LON_ZOOM_FOR_UI_LIST,
  SET_MAP_LAT_LON_CENTER,
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
  // This visitedLocations for DEV b/c otherwise, each time app reloads,
  // I must "signin" a User to populate this field.
  visitedLocations: ['5b3cfa5f8b3c33973279e8c1','5b3cfa5f8b3c33973279e8b6', '5b3cfa5f8b3c33973279e8a2'],
  // below for PRODUCTION...
  // visitedLocations: [],
  displayedMapLocations: [],
  filteredListLocations: [],
  // TODO - refact for SET_LAT_LON_ZOOM_FOR_UI_LIST
  mapGeoCenter: 'US',
  // default value set to US.
  uiListRecenterCoords: {
    lat: 37,
    lon: -96.5795,
    zoom: 4.1
  },
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

    // // orig
    // case FETCH_LOCATIONS_SUCCESS:
    //   return {
    //     ...state,
    //     locationsBeenFetched: true,
    //     cachedLocations: action.locations,
    //     displayedMapLocations: action.locations,
    //     filteredListLocations: action.locations,
    //     isFetching: false,
    //     err: ""
    //   };

    // refact
    case FETCH_LOCATIONS_SUCCESS:
      // Fetched locations are "single source of truth" - all User's get this set of
      // locations from API.
      //
      // Different User's will see different "green" markers depending whether or not
      // they have personally visited / written a review a location.
      //
      // Visited locations are stored in the UserSchema and placed into Redux state
      // when the User signsin.
      //
      // When locations fetched from API,
      // process fetched locations and set the "location.visited" to "true",
      // when a location's id is in the state.visitedLocations array.
      const fetchedLocations = action.locations;
      const processedLocations = fetchedLocations.map((location) => {
        if (state.visitedLocations.indexOf(location._id) >= 0) {
          location.visited = true;
        }
        return location;
      });

      return {
        ...state,
        locationsBeenFetched: true,
        cachedLocations: processedLocations,
        displayedMapLocations: processedLocations,
        filteredListLocations: processedLocations,
        isFetching: false,
        err: ""
      };

    case FETCH_LOCATIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        err: action.err
      };

    case SET_VISITED_LOCATIONS_ON_SIGNIN:
      return {
        ...state,
        visitedLocations: action.visitedLocations
      };

      // TODO - SET_MAP_GEO_CENTER should this be lat/lon/zoom not a String??
    case SET_MAP_GEO_CENTER:
      //
      return {
        ...state,
        mapGeoCenter: action.geoCenter
      };

    // TODO - refact for SET_MAP_GEO_CENTER.
    case SET_LAT_LON_ZOOM_FOR_UI_LIST:
      console.log('recider_locations.js case SET_LAT_LON_ZOOM_FOR_UI_LIST , action = ', action);
      return {
        ...state,
        uiListRecenterCoords: action.uiListRecenterCoords
      };

    case SET_MAP_LAT_LON_CENTER:

       lat = action.coords.lat;
       lon = action.coords.lng;

      return {
        ...state,
        mapCenterLat: lat,
        mapCenterLon: lon
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

      const location = state.cachedLocations.find(location => {
          return (location.name === action.singleLocationData.name)
        }
      );

      return {
        ...state,
        displayedMapLocations: [location],
        mapCenterLat: action.singleLocationData.lat,
        mapCenterLon: action.singleLocationData.lon,
        mapZoom: action.singleLocationData.zoom,
      };

// TODO - refact for SET_LAT_LON_ZOOM_FOR_UI_LIST
    case MAP_ALL_LOCATIONS_FROM_UI_LIST:
      console.log('reducer_locations.js MAP_ALL_LOCATIONS_FROM_UI_LIST = action = ', action);

      // // old geoCenter approach...before refact to setLatLonZoomForUiList logic.
      // if( action.geoCenter === 'US' ) {
      //   lat= mapConfig.US.lat;
      //   lon= mapConfig.US.lon;
      //   zoom= mapConfig.US.zoom;
      //
      // } else if ( action.geoCenter === 'nearme') {
      //   // future code.
      // } else {
      //   // handles any geoCenter containing a US State's name.
      //   console.log('reducer_locations.js MAP_ALL_LOCATIONS_FROM_UI_LIST "else" action / action = ', action);
      //   stateCode = stateNameToAbbr[action.geoCenter];
      //   lat = mapConfig[stateCode].lat;
      //   lon = mapConfig[stateCode].lon;
      //   zoom = mapConfig[stateCode].zoom;
      // }
      //
      // return {
      //   ...state,
      //   mapCenterLat: lat,
      //   mapCenterLon: lon,
      //   mapZoom: zoom,
      //   displayedMapLocations: [...state.filteredListLocations],
      // };

      return {
        ...state,
        mapCenterLat: action.uiListRecenterCoords.lat,
        mapCenterLon: action.uiListRecenterCoords.lon,
        mapZoom: action.uiListRecenterCoords.zoom,
        displayedMapLocations: [...state.filteredListLocations],
      };

    default:
      return state;
  }
}