import {
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_ERROR,
  SET_LAT_LON_ZOOM_FOR_UI_LIST,
  SET_MAP_LAT_LON_CENTER,
  MAP_SINGLE_LOCATIONS_FROM_UI_LIST,
  MAP_ALL_LOCATIONS_FROM_UI_LIST,
  CLEAR_LOCATIONS_FROM_UI_LIST,
  CREATE_US_LOCATIONS_UI_LIST,
  CREATE_STATE_LOCATIONS_UI_LIST,
  SET_LOCATION_ID,
  UPDATE_MARKERS_LOCATIONS_LIST,
} from "../actions/action_locations";
import mapConfig from '../configs/mapConfig';
import stateNameToAbbr from '../configs/stateNameToAbbrConfig';

const initialState = {
  locationsBeenFetched: false,
  cachedLocations: [],
  displayedMapLocations: [],
  filteredListLocations: [],
  usStateSelected: '',        // needed for updateMarkersLocationList
  locationId: '',             // locationId of clicked Map Marker.
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

  let lat, lon, zoom, usStateAbbr, locations, filteredLocations, visitedLocationsIds_, processedLocations;

  switch (action.type) {

    case FETCH_LOCATIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case FETCH_LOCATIONS_SUCCESS:
      // Fetched locations from API are "single source of truth" - all User's get this set of
      // locations from API.
      //
      // Different User's will see different "green" markers depending whether or not
      // they have personally visited / written a review a location.
      //
      // Visited location's reviews are stored in the UserSchema and placed into Redux state
      // when the User signs-in, AND upon Browser refresh.
      //
      // When locations fetched from API,
      // process the fetched locations and set the "location.visited" to "true",
      // when a location's id is in the state.visitedLocationsIds_ array.

      const fetchedLocations = action.locations;

      // create array of visited locations Ids from the reviews array.
      visitedLocationsIds_ = action.reviews.map(review => {
        return review.locationId;
      });

      // If User has visited a location/written a review,
      // set location.visited to "true".
      processedLocations = fetchedLocations.map((location) => {

        if (visitedLocationsIds_.indexOf(location._id) >= 0) {
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

    case SET_LAT_LON_ZOOM_FOR_UI_LIST:
      return {
        ...state,
        uiListRecenterCoords: action.uiListRecenterCoords
      };

    // on map onDragEnd, set the map's lat/lon.
    // on map zoom, set the map's lat/lon.
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
        displayedMapLocations: state.cachedLocations,
        filteredListLocations: state.cachedLocations,
        mapCenterLat: mapConfig.US.lat,
        mapCenterLon: mapConfig.US.lon,
        mapZoom: mapConfig.US.zoom,
      };

    case CREATE_STATE_LOCATIONS_UI_LIST:

      usStateAbbr = stateNameToAbbr[action.stateName];

      filteredLocations = state.cachedLocations.filter((location) => {
        return location.state === usStateAbbr;
      });

      return {
        ...state,
        displayedMapLocations: filteredLocations,
        filteredListLocations: filteredLocations,
        usStateSelected: usStateAbbr,
        mapCenterLat: mapConfig[usStateAbbr].lat,
        mapCenterLon: mapConfig[usStateAbbr].lon,
        mapZoom: mapConfig[usStateAbbr].zoom,
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

    case MAP_ALL_LOCATIONS_FROM_UI_LIST:
      return {
        ...state,
        mapCenterLat: action.uiListRecenterCoords.lat,
        mapCenterLon: action.uiListRecenterCoords.lon,
        mapZoom: action.uiListRecenterCoords.zoom,
        displayedMapLocations: state.filteredListLocations,
      };

    // When User clicks a Map Maker, store the Location Id in Redux.
    // Location Id needed when User creates a Review.
    case SET_LOCATION_ID:
      return {
        ...state,
        locationId: action.locationId,
      };

    case UPDATE_MARKERS_LOCATIONS_LIST:
      const reviews = action.reviews;

      // create array of visited locations Ids from the reviews array.
      visitedLocationsIds_ = reviews.map(review => {
        return review.locationId;
      });

      // If User has visited a location/written a review,
      // set location.visited to "true".
      processedLocations = state.cachedLocations.map((location) => {
        location.visited = false;
        if (visitedLocationsIds_.indexOf(location._id) >= 0) {
          location.visited = true;
        }
        return location;
      });

      // If the User has selected a US State, cull the processedLocations
      // to ensure displayedLocations, filteredListLocations
      // are that of the selected State.
      // usStateSelected is set in  action_locations.js CREATE_STATE_LOCATIONS_UI_LIST.

      if ( state.usStateSelected ) {
        console.log('state.usStateSelected  ran');
        locations = processedLocations.filter((location) => {
          return location.state === state.usStateSelected;
        });
      } else {
        locations = processedLocations
      }

      console.log('locations ', locations);

      return {
        ...state,
        cachedLocations: processedLocations,
        displayedMapLocations: locations,
        filteredListLocations: locations,
        usStateSelected: ''                       // reset for next round.
      };

    default:
      return state;
  }
}