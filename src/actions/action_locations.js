import { store } from '../index';
// TODO - keep or discard Root.js
// import { store } from '../Root';
import { API_BASE_URL } from "../configs/config";

let reviews;


///////////////////////////////////////////////////////////////////////////////
// fetchLocations - BEGIN
///////////////////////////////////////////////////////////////////////////////
export const fetchLocations = () => dispatch => {
  // In Map.js componentDidMount() reviews are fetched first,
  // then fetchLocations() is invoked once review fetch is complete.
  // Get User's reviews directly from Redux store.
  // By the time fetchLocations runs, reviews have been fetched.
  reviews = store.getState().reviews.reviews;

  dispatch(fetchLocationsRequest);

  fetch(`${API_BASE_URL}/locations`, {
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
// On map onDragEnd, set the map's lat/lon.
// Needed if User clicks "Map All Listed Locations" button.
// When User clicks "Map All Listed Locations" button,
// the Redux State is changed back to values in uiListRecenterCoords,
// and the map re-centers to the Redux uiListRecenterCoords.
export const SET_MAP_LAT_LON_CENTER = 'SET_MAP_LAT_LON_CENTER';
export const setMapLatLonCenter = (coords) => {
  return {
    type: SET_MAP_LAT_LON_CENTER,
    coords
  }
};

// On map zoom (via Google Map Zoom Control, etc.), set the map's zoom.
// Needed if User clicks "Map All Listed Locations" button.
// When User clicks "Map All Listed Locations" button,
// the Redux State is changed back to values in uiListRecenterCoords,
// and the map returns to the zoom in Redux uiListRecenterCoords.
export const SET_MAP_ZOOM = 'SET_MAP_ZOOM';
export const setMapZoom = (zoom) => {
  return {
    type: SET_MAP_ZOOM,
    zoom
  }
};

// SET_LAT_LON_ZOOM_FOR_UI_LIST pertains to re-centering map when "Map All Listed Locations" button clicked.
// This Action Creator called when:
// 1) US Radio button selected, set US lat/lon/zoom.
// 2) a US State is selected from drop down list.
// 3) For "nearme", it is a two part process.
//    "Nearme" Radio button is selected,
//    and User selects a "nearme" distance from drop down list.
// 4) Visited button selected, set US lat/lon/zoom.
export const SET_LAT_LON_ZOOM_FOR_UI_LIST = 'SET_LAT_LON_ZOOM_FOR_UI_LIST';
export const setLatLonZoomForUiList = (uiListRecenterCoords) => {
  return {
    type: SET_LAT_LON_ZOOM_FOR_UI_LIST,
    uiListRecenterCoords
  }
};

export const MAP_SINGLE_LOCATION_FROM_UI_LIST = 'MAP_SINGLE_LOCATION_FROM_UI_LIST';
export const mapSingleLocationFromList = (singleLocationData) => {
  return {
    type: MAP_SINGLE_LOCATION_FROM_UI_LIST,
    singleLocationData
  }
};

export const MAP_ALL_LOCATIONS_FROM_UI_LIST = 'MAP_ALL_LOCATIONS_FROM_UI_LIST';
export const mapAllLocationsFromList = () => {
  return {
    type: MAP_ALL_LOCATIONS_FROM_UI_LIST
  }
};

export const CLEAR_LOCATIONS_FROM_UI_LIST = 'CLEAR_LOCATIONS_FROM_UI_LIST';
export const clearLocationsFromList = () => {
  return {
    type: CLEAR_LOCATIONS_FROM_UI_LIST
  }
};

export const CREATE_US_LOCATIONS_UI_LIST = 'CREATE_US_LOCATIONS_UI_LIST';
export const createUsLocationsList = (zoom) => {
  return {
    type: CREATE_US_LOCATIONS_UI_LIST,
    zoom
  }
};

export const CREATE_VISITED_LOCATIONS_UI_LIST = 'CREATE_VISITED_LOCATIONS_UI_LIST';
export const createVisitedLocationsUiList = (zoom) => {
  return {
    type: CREATE_VISITED_LOCATIONS_UI_LIST,
    zoom
  }
};

export const CREATE_STATE_LOCATIONS_UI_LIST = 'CREATE_STATE_LOCATIONS_UI_LIST';
export const createStateLocationsList = (usStateAbbr, zoom) => {
  return {
    type: CREATE_STATE_LOCATIONS_UI_LIST,
    usStateAbbr,
    zoom
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

// For Map.js setScreenResizeZoom() logic.
export const SET_US_STATE_ABBR = 'SET_US_STATE_ABBR';
export const setUsStateAbbr = (usStateAbbr) => {
  return {
    type: SET_US_STATE_ABBR,
    usStateAbbr
  }
};

export const SET_NEAR_ME_DISTANCE = 'SET_NEAR_ME_DISTANCE';
export const setNearMeDistance = (nearMeDistance) => {
  return {
    type: SET_NEAR_ME_DISTANCE,
    nearMeDistance
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


///////////////////////////////////////////////////////////////////////////////
// Near Me - BEGIN
///////////////////////////////////////////////////////////////////////////////
export const SET_IS_GEOLOCATING = 'SET_IS_GEOLOCATING';
export const setIsGeolocating = (bool) => {
  return {
    type: SET_IS_GEOLOCATING,
    bool
  }
};

export const SET_USERS_NEARME_DATA = 'SET_USERS_NEARME_DATA';
export const setUsersNearmeData = (usersNearmeData) => {
  return {
    type: SET_USERS_NEARME_DATA,
    usersNearmeData
  }
};

export const fetchNearmeLocations = (usersNearmeData) => dispatch => {
  // Get User's reviews directly from Redux store.
  // Note: By the time fetchNearmeLocations runs, reviews have been fetched
  //       when the App initially loads.
  reviews = store.getState().reviews.reviews;
  const { lat, lon, distanceMeters } = usersNearmeData;

  dispatch(fetchNearmeLocationsRequest);

  fetch(`${API_BASE_URL}/locations/nearme?lat=${lat}&lon=${lon}&distanceMeters=${distanceMeters}`, {
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
      dispatch(fetchNearmeLocationsSuccess(locations, reviews))
    })
    .catch(err => {
      dispatch(fetchNearmeLocationsError(err))
    })

};

export const FETCH_NEARME_LOCATIONS_REQUEST = 'FETCH_NEARME_LOCATIONS_REQUEST';
export const fetchNearmeLocationsRequest = () => ({
  type: FETCH_NEARME_LOCATIONS_REQUEST,
});

export const FETCH_NEARME_LOCATIONS_SUCCESS = 'FETCH_NEARME_LOCATIONS_SUCCESS';
export const fetchNearmeLocationsSuccess = (locations, reviews) => {
  return {
    type: FETCH_NEARME_LOCATIONS_SUCCESS,
    locations,
    reviews
  }
};

export const FETCH_NEARME_LOCATIONS_ERROR = 'FETCH_NEARME_LOCATIONS_ERROR';
export const fetchNearmeLocationsError = (err) => {
  return {
    type: FETCH_NEARME_LOCATIONS_ERROR,
    err
  }
};
///////////////////////////////////////////////////////////////////////////////
// Near Me - END
///////////////////////////////////////////////////////////////////////////////