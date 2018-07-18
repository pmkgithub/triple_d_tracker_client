const ROOT_URL = 'http://localhost:8080/api';

///////////////////////////////////////////////////////////////////////////////
// fetchLocations - BEGIN
///////////////////////////////////////////////////////////////////////////////

export const fetchLocations = () => dispatch => {

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
      // TODO - modify the visited locations b/f dispatching?
      // TODO - or modify the visited locations in reducer?
      // TODO - or modifiy the visited locations b/f rendering?
      dispatch(fetchLocationsSuccess(locations))
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
export const fetchLocationsSuccess = (locations) => {
  return {
    type: FETCH_LOCATIONS_SUCCESS,
    locations
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

// On signin, API sends visitedLocations array to Client.
// This Action Creator is imported into /actions/index.js file.
export const SET_VISITED_LOCATIONS_ON_SIGNIN = 'SET_VISITED_LOCATIONS_ON_SIGNIN';
export const setVisitedLocationsOnSignin = (visitedLocations) => ({
  type: SET_VISITED_LOCATIONS_ON_SIGNIN,
  visitedLocations
});

// Note: geoCenter is a string:
//       e.g. 'US' when the USA Radio Button is clicked,
//       or 'Kansas', etc. returned when clicking the Select Input of States.
export const SET_MAP_GEO_CENTER = 'SET_MAP_GEO_CENTER';
export const setMapGeoCenter = (geoCenter) => {
  return {
    type: SET_MAP_GEO_CENTER,
    geoCenter
  }
};

// Pertains to re-centering map when "Map All Listed Locations" button clicked.
// This Action Creator called when:
// 1) US Radio button selected, set US lat/lon/zoom.
// 2) US State is selected from drop down list.
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
// // TODO - refact for SET_LAT_LON_ZOOM_FOR_UI_LIST
// // old code b/f refact
// export const MAP_ALL_LOCATIONS_FROM_UI_LIST = 'MAP_ALL_LOCATIONS_FROM_UI_LIST';
// export const mapAllLocationsFromList = (geoCenter) => {
//   console.log('action_locations.js MAP_ALL_LOCATIONS_FROM_UI_LIST geoCenter = ', geoCenter);
//   return {
//     type: MAP_ALL_LOCATIONS_FROM_UI_LIST,
//     geoCenter
//   }
// };
// new code for refact
export const MAP_ALL_LOCATIONS_FROM_UI_LIST = 'MAP_ALL_LOCATIONS_FROM_UI_LIST';
export const mapAllLocationsFromList = (uiListRecenterCoords) => {
  console.log('action_locations.js MAP_ALL_LOCATIONS_FROM_UI_LIST uiListRecenterCoords = ', uiListRecenterCoords);
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

export const CREATE_STATE_LOCATIONS_UI_LIST = 'CREATE_STATE_LOCATIONS_UI_LIST';
export const createStateLocationsList = (stateName) => {
  return {
    type: CREATE_STATE_LOCATIONS_UI_LIST,
    stateName
  }
};
///////////////////////////////////////////////////////////////////////////////
// other - END
///////////////////////////////////////////////////////////////////////////////

