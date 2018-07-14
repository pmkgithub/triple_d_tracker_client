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

// Note: geoCenter is a string: e.g. 'US', 'Kansas' returned from clicking
//       the Select Input of States, or the USA Radio Button being clicked.
// Based on this string, config files map the lat, lon in the reducer.
export const SET_MAP_GEO_CENTER = 'SET_MAP_GEO_CENTER';
export const setMapGeoCenter = (geoCenter) => {
  return {
    type: SET_MAP_GEO_CENTER,
    geoCenter
  }
};

export const SET_MAP_LAT_LON_CENTER = 'SET_MAP_LAT_LON_CENTER';
export const setMapLatLonCenter = (coords) => {
  return {
    type: SET_MAP_LAT_LON_CENTER,
    coords
  }
};

export const MAP_SINGLE_LOCATIONS_FROM_UI_LIST = 'MAP_SINGLE_LOCATIONS_FROM_UI_LIST';
export const mapSingleLocationFromList = (recenterData) => {
  return {
    type: MAP_SINGLE_LOCATIONS_FROM_UI_LIST,
    recenterData
  }
};

export const MAP_ALL_LOCATIONS_FROM_UI_LIST = 'MAP_ALL_LOCATIONS_FROM_UI_LIST';
export const mapAllLocationsFromList = (geoCenter) => {
  return {
    type: MAP_ALL_LOCATIONS_FROM_UI_LIST,
    geoCenter
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

