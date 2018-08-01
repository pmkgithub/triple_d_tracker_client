import { store } from '../index';
const ROOT_URL = 'http://localhost:8080/api';


///////////////////////////////////////////////////////////////////////////////
// fetchLocations - BEGIN
///////////////////////////////////////////////////////////////////////////////
export const fetchLocations = () => dispatch => {
  // Get User's reviews directly from Redux store.
  // Note: By the time this code runs, reviews have been fetched.
  const reviews = store.getState().reviews.reviews;

  dispatch(fetchLocationsRequest);

  fetch(`${ROOT_URL}/locations`, {
    method: "GET",
    headers: {
      "authorization": localStorage.getItem('token')
    },
  })
    .then(res => {
      if(!res.ok) {
        return Promise.reject(res.statusText)
      }
      return res.json();
    })
    .then(locations => {
      dispatch(fetchLocationsSuccess(locations, reviews))
    })
    .catch(err => {
      dispatch(fetchLocationsError(err))
    })

};

export const FETCH_LOCATIONS_REQUEST = 'FETCH_LOCATIONS_REQUEST';
export const fetchLocationsRequest = () => ({
  type: FETCH_LOCATIONS_REQUEST,
});

export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const fetchLocationsSuccess = (locations, reviews) => {
  return {
    type: FETCH_LOCATIONS_SUCCESS,
    locations,
    reviews
  }
};

export const FETCH_LOCATIONS_ERROR = 'FETCH_LOCATIONS_ERROR';
export const fetchLocationsError = (err) => {
  return {
    type: FETCH_LOCATIONS_ERROR,
    err
  }
};

///////////////////////////////////////////////////////////////////////////////
// fetchLocations - END
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// other - BEGIN
///////////////////////////////////////////////////////////////////////////////

// SET_LAT_LON_ZOOM_FOR_UI_LIST pertains to re-centering map when "Map All Listed Locations" button clicked.
// This Action Creator called when:
// 1) US Radio button selected, set US lat/lon/zoom.
// 2) a US State is selected from drop down list.
// 3) For "nearme", it is a two part process.
//    "Nearme" Radio button is selected ,
//    and User selects a "nearme" distance from drop down list.
export const SET_LAT_LON_ZOOM_FOR_UI_LIST = 'SET_LAT_LON_ZOOM_FOR_UI_LIST';
export const setLatLonZoomForUiList = (uiListRecenterCoords) => {
  return {
    type: SET_LAT_LON_ZOOM_FOR_UI_LIST,
    uiListRecenterCoords
  }
};

// on map onDragEnd, set the map's lat/lon.
// on map zoom, set the map's lat/lon.
export const SET_MAP_LAT_LON_CENTER = 'SET_MAP_LAT_LON_CENTER';
export const setMapLatLonCenter = (coords) => {
  return {
    type: SET_MAP_LAT_LON_CENTER,
    coords
  }
};

export const MAP_SINGLE_LOCATIONS_FROM_UI_LIST = 'MAP_SINGLE_LOCATIONS_FROM_UI_LIST';
export const mapSingleLocationFromList = (singleLocationData) => {
  return {
    type: MAP_SINGLE_LOCATIONS_FROM_UI_LIST,
    singleLocationData
  }
};

export const MAP_ALL_LOCATIONS_FROM_UI_LIST = 'MAP_ALL_LOCATIONS_FROM_UI_LIST';
export const mapAllLocationsFromList = (uiListRecenterCoords) => {
  return {
    type: MAP_ALL_LOCATIONS_FROM_UI_LIST,
    uiListRecenterCoords
  }
};

export const CLEAR_LOCATIONS_FROM_UI_LIST = 'CLEAR_LOCATIONS_FROM_UI_LIST';
export const clearLocationsFromList = () => {
  return {
    type: CLEAR_LOCATIONS_FROM_UI_LIST
  }
};

export const CREATE_US_LOCATIONS_UI_LIST = 'CREATE_US_LOCATIONS_UI_LIST';
export const createUsLocationsList = () => {
  return {
    type: CREATE_US_LOCATIONS_UI_LIST
  }
};

export const CREATE_VISIITED_LOCATIONS_UI_LIST = 'CREATE_VISIITED_LOCATIONS_UI_LIST';
export const createVisitedLocationsUiList = () => {
  return {
    type: CREATE_VISIITED_LOCATIONS_UI_LIST
  }
};

export const CREATE_STATE_LOCATIONS_UI_LIST = 'CREATE_STATE_LOCATIONS_UI_LIST';
export const createStateLocationsList = (usStateAbbr) => {
  return {
    type: CREATE_STATE_LOCATIONS_UI_LIST,
    usStateAbbr
  }
};

// When User clicks a Map Maker, store the Location Id.
// Location Id needed when User creates a Review.
export const SET_LOCATION_ID = 'SET_LOCATION_ID';
export const setLocationId = (locationId) => {
  return {
    type: SET_LOCATION_ID,
    locationId
  }
};


///////////////////////////////////////////////////////////////////////////////
// other - END
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// Update Markers and Locations List when review added/deleted - BEGIN
///////////////////////////////////////////////////////////////////////////////
// Called in action_reviews.js, createReview, deleteReview.
// On Review CREATE/DELETE, updates Marker color, Locations List check-mark (if necessary).
export const UPDATE_MARKERS_LOCATIONS_LIST = 'UPDATE_MARKERS_LOCATIONS_LIST';
export const updateMarkersLocationsList = (reviews) => {
  return {
    type: UPDATE_MARKERS_LOCATIONS_LIST,
    reviews
  }
};
///////////////////////////////////////////////////////////////////////////////
// Update Markers and Locations List when review added/deleted - END
///////////////////////////////////////////////////////////////////////////////