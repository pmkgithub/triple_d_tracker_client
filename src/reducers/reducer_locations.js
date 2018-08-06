import {
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_ERROR,

  SET_MAP_LAT_LON_CENTER,
  SET_MAP_ZOOM,

  SET_LAT_LON_ZOOM_FOR_UI_LIST,
  MAP_SINGLE_LOCATION_FROM_UI_LIST,
  MAP_ALL_LOCATIONS_FROM_UI_LIST,
  CLEAR_LOCATIONS_FROM_UI_LIST,
  CREATE_US_LOCATIONS_UI_LIST,
  CREATE_VISITED_LOCATIONS_UI_LIST,
  CREATE_STATE_LOCATIONS_UI_LIST,
  SET_LOCATION_ID,

  UPDATE_MARKERS_LOCATIONS_LIST,

  SET_IS_GEOLOCATING,
  SET_USERS_NEARME_DATA,
  FETCH_NEARME_LOCATIONS_REQUEST,
  FETCH_NEARME_LOCATIONS_SUCCESS,
  FETCH_NEARME_LOCATIONS_ERROR
} from "../actions/action_locations";
import mapConfig from '../configs/mapConfig';

const initialState = {
  locationsBeenFetched: false,
  cachedLocations: [],
  displayedMapLocations: [],
  filteredLocationsList: [],
  // default isUsRadioButtonSelected to "true"
  // b/c USA radio button is pre-selected on App launch.
  isUsRadioButtonSelected: true,        // for UPDATE_MARKERS_LOCATIONS_LIST - US case
  selectedUsStateAbbr: '',              // for UPDATE_MARKERS_LOCATIONS_LIST - US State case
  isVisitedRadioButtonSelected: false,  // for UPDATE_MARKERS_LOCATIONS_LIST - Visited case
  isNearmeRadioButtonSelected: false,   // for UPDATE_MARKERS_LOCATIONS_LIST - Visited case
  isMappingSingleLocation: false,       // for UPDATE_MARKERS_LOCATIONS_LIST - Single Location view case
  singleLocationData: {},               // for UPDATE_MARKERS_LOCATIONS_LIST - Single Location view case
  locationId: '',                       // locationId of clicked Map Marker.
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
  err: "",
  isGeolocating: false,
  usersNearmeData: {
    distanceMeters: '',
    lat: '',
    lon: '',
    zoom: ''
  },
  currentNearmeLocations: []
};

export default (state=initialState, action) => {

  let lat, lon, zoom, locations, filteredLocations, visitedLocationsIds, processedLocations;

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
      // when a location's id is in the state.visitedLocationsIds array.

      const fetchedLocations = action.locations;

      // create array of visited locations Ids from the reviews array.
      visitedLocationsIds = action.reviews.map(review => {
        return review.locationId;
      });

      // If User has visited a location/written a review,
      // set location.visited to "true".
      processedLocations = fetchedLocations.map((location) => {
        if (visitedLocationsIds.indexOf(location._id) >= 0) {
          location.visited = true;
        }
        return location;
      });

      return {
        ...state,
        locationsBeenFetched: true,
        cachedLocations: processedLocations,
        displayedMapLocations: processedLocations,
        filteredLocationsList: processedLocations,
        isFetching: false,
        err: ""
      };

    case FETCH_LOCATIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        err: action.err
      };

    // On map onDragEnd, set the map's lat/lon.
    // Needed if User clicks "Map All Listed Locations" button.
    // When User clicks "Map All Listed Locations" button,
    // the Redux State is changed back to values in uiListRecenterCoords,
    // and the map re-centers to the Redux uiListRecenterCoords.
    case SET_MAP_LAT_LON_CENTER:

      lat = action.coords.lat;
      lon = action.coords.lng;

      return {
        ...state,
        mapCenterLat: lat,
        mapCenterLon: lon
      };

    // On map zoom (via Google Map Zoom Control, etc.), set the map's zoom.
    // Needed if User clicks "Map All Listed Locations" button.
    // When User clicks "Map All Listed Locations" button,
    // the Redux State is changed back to values in uiListRecenterCoords,
    // and the map returns to the zoom in Redux uiListRecenterCoords.
    case SET_MAP_ZOOM:
      zoom = action.zoom;

      return {
        ...state,
        mapZoom: zoom
      };

    case SET_LAT_LON_ZOOM_FOR_UI_LIST:
      return {
        ...state,
        uiListRecenterCoords: action.uiListRecenterCoords
      };

    case CLEAR_LOCATIONS_FROM_UI_LIST:
      return {
        ...state,
        mapCenterLat: mapConfig.US.lat,
        mapCenterLon: mapConfig.US.lon,
        mapZoom: mapConfig.US.zoom,
        displayedMapLocations: [],
        filteredLocationsList: []
      };

    case CREATE_US_LOCATIONS_UI_LIST:
      return {
        ...state,
        displayedMapLocations: state.cachedLocations,
        filteredLocationsList: state.cachedLocations,
        isUsRadioButtonSelected: true,                // for UPDATE_MARKERS_LOCATIONS_LIST.
        selectedUsStateAbbr: '',                      // for UPDATE_MARKERS_LOCATIONS_LIST.
        isVisitedRadioButtonSelected: false,          // for UPDATE_MARKERS_LOCATIONS_LIST.
        isNearmeRadioButtonSelected: false,           // for UPDATE_MARKERS_LOCATIONS_LIST.
        mapCenterLat: mapConfig.US.lat,
        mapCenterLon: mapConfig.US.lon,
        mapZoom: mapConfig.US.zoom,
      };

    case CREATE_STATE_LOCATIONS_UI_LIST:
      const usStateAbbr = action.usStateAbbr;

      filteredLocations = state.cachedLocations.filter((location) => {
        return location.state === usStateAbbr;
      });

      return {
        ...state,
        displayedMapLocations: filteredLocations,
        filteredLocationsList: filteredLocations,
        isUsRadioButtonSelected: false,           // for UPDATE_MARKERS_LOCATIONS_LIST.
        selectedUsStateAbbr: usStateAbbr,         // for UPDATE_MARKERS_LOCATIONS_LIST.
        isVisitedRadioButtonSelected: false,      // for UPDATE_MARKERS_LOCATIONS_LIST.
        isNearmeRadioButtonSelected: false,       // for UPDATE_MARKERS_LOCATIONS_LIST.
        mapCenterLat: mapConfig[usStateAbbr].lat,
        mapCenterLon: mapConfig[usStateAbbr].lon,
        mapZoom: mapConfig[usStateAbbr].zoom,
      };

    case CREATE_VISITED_LOCATIONS_UI_LIST:
      // Find only locations with visited === true.
      const visitedLocations = state.cachedLocations.filter((location) => {
        return location.visited === true;
      });
      return {
        ...state,
        displayedMapLocations: visitedLocations,
        filteredLocationsList: visitedLocations,
        isUsRadioButtonSelected: false,           // for UPDATE_MARKERS_LOCATIONS_LIST.
        selectedUsStateAbbr: '',                  // for UPDATE_MARKERS_LOCATIONS_LIST.
        isVisitedRadioButtonSelected: true,       // for UPDATE_MARKERS_LOCATIONS_LIST.
        isNearmeRadioButtonSelected: false,       // for UPDATE_MARKERS_LOCATIONS_LIST.
        mapCenterLat: mapConfig.US.lat,
        mapCenterLon: mapConfig.US.lon,
        mapZoom: mapConfig.US.zoom,
      };

    case MAP_SINGLE_LOCATION_FROM_UI_LIST:
      const location = state.cachedLocations.find(location => {
          return (location.name === action.singleLocationData.name)
        }
      );
      return {
        ...state,
        isMappingSingleLocation: true,                  // for UPDATE_MARKERS_LOCATIONS_LIST.
        singleLocationData: action.singleLocationData,  // for UPDATE_MARKERS_LOCATIONS_LIST.
        displayedMapLocations: [location],
        mapCenterLat: action.singleLocationData.lat,
        mapCenterLon: action.singleLocationData.lon,
        mapZoom: action.singleLocationData.zoom,
      };

    case MAP_ALL_LOCATIONS_FROM_UI_LIST:
      return {
        ...state,
        mapCenterLat: state.uiListRecenterCoords.lat,
        mapCenterLon: state.uiListRecenterCoords.lon,
        mapZoom: state.uiListRecenterCoords.zoom,
        displayedMapLocations: state.filteredLocationsList,
        isMappingSingleLocation: false
      };

    // When User clicks a Map Maker, store the Location Id in Redux.
    // Location Id needed when User creates a Review.
    case SET_LOCATION_ID:
      return {
        ...state,
        locationId: action.locationId,
      };

    ///////////////////////////////////////////////////////////////////////////
    // Update Markers and Locations List - BEGIN
    ///////////////////////////////////////////////////////////////////////////
    case UPDATE_MARKERS_LOCATIONS_LIST:
      const reviews = action.reviews;

      // create array of visited locations Ids from the reviews array.
      visitedLocationsIds = reviews.map(review => {
        return review.locationId;
      });

      // Reset all locations visited property to "false".
      // If User has visited a location/written a review, set location.visited to "true".
      processedLocations = state.cachedLocations.map((location) => {
        location.visited = false;
        if (visitedLocationsIds.indexOf(location._id) >= 0) {
          location.visited = true;
        }
        return location;
      });


      if ( state.isUsRadioButtonSelected ) {

        locations = processedLocations;
      }

      if ( state.selectedUsStateAbbr ) {
        locations = processedLocations.filter((location) => {
          return location.state === state.selectedUsStateAbbr;
        });
      }

      if ( state.isVisitedRadioButtonSelected ) {
        locations = processedLocations.filter((location) => {
          return location.visited === true;
        });
      }

      if ( state.isNearmeRadioButtonSelected ) {
        locations = state.currentNearmeLocations.map((location) => {
          location.visited = false;
          if (visitedLocationsIds.indexOf(location._id) >= 0) {
            location.visited = true;
          }
          return location;
        });
      }

      // Make this the last if stmt b/c "locations" variable is set
      // by one of the above if stmts.
      if ( state.isMappingSingleLocation ) {
        const singleLocation = state.cachedLocations.find(location => {
          return (location.name === state.singleLocationData.name);
        });

        // "locations" assigned to filterLocationsList
        //  is set in one of the above if stmt's.
        return {
          ...state,
          isMappingSingleLocation: false,           // reset for next cycle.
          cachedLocations: processedLocations,
          displayedMapLocations: [singleLocation],
          filteredLocationsList: locations,
        };
      }

      // return stmt for isUsRadioButtonSelected, selectedUsStateAbbr, isVisitedRadioButtonSelected
      return {
        ...state,
        cachedLocations: processedLocations,
        displayedMapLocations: locations,
        filteredLocationsList: locations,
      };

    ///////////////////////////////////////////////////////////////////////////
    // Update Markers and Locations List - END
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    // Nearme - BEGIN
    ///////////////////////////////////////////////////////////////////////////
    case SET_IS_GEOLOCATING:
      return {
        ...state,
        isGeolocating: action.bool
      }

    case SET_USERS_NEARME_DATA:
      return {
        ...state,
        usersNearmeData: action.usersNearmeData
      };

    case FETCH_NEARME_LOCATIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case FETCH_NEARME_LOCATIONS_SUCCESS:
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
      // when a location's id is in the state.visitedLocationsIds array.

      const fetchedNearmeLocations = action.locations;

      // create array of visited locations Ids from the reviews array.
      visitedLocationsIds = action.reviews.map(review => {
        return review.locationId;
      });

      // If User has visited a location/written a review,
      // set location.visited to "true".
      processedLocations = fetchedNearmeLocations.map((location) => {
        if (visitedLocationsIds.indexOf(location._id) >= 0) {
          location.visited = true;
        }
        return location;
      });

      return {
        ...state,
        // locationsBeenFetched: true,
        // cachedLocations: processedLocations,
        displayedMapLocations: processedLocations,
        filteredLocationsList: processedLocations,
        currentNearmeLocations: processedLocations,  // for UPDATE_MARKERS_LOCATIONS_LIST.
        isNearmeRadioButtonSelected: true,
        mapCenterLat: state.uiListRecenterCoords.lat,
        mapCenterLon: state.uiListRecenterCoords.lon,
        mapZoom: state.uiListRecenterCoords.zoom,
        isFetching: false,
        err: ""
      };

    case FETCH_NEARME_LOCATIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        err: action.err
      };
    ///////////////////////////////////////////////////////////////////////////
    // Nearme - END
    ///////////////////////////////////////////////////////////////////////////


    default:
      return state;
  }
}