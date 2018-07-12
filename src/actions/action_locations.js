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
export const MAP_SINGLE_LOCATION_FROM_LIST = 'MAP_SINGLE_LOCATION_FROM_LIST';
export const mapSingleLocationFromList = (recenterData) => {
  // console.log('centerMapOnSingleLocation ran');
  // console.log('recenterData = ', recenterData);
  return {
    type: MAP_SINGLE_LOCATION_FROM_LIST,
    recenterData
  }
};

export const MAP_ALL_LOCATIONS_FROM_LIST = 'MAP_ALL_LOCATIONS_FROM_LIST';
export const mapAllLocationsFromList = () => {
  console.log('action mapListedLocations ran');
  return {
    type: MAP_ALL_LOCATIONS_FROM_LIST
  }
};

export const CLEAR_LOCATIONS_FROM_LIST = 'CLEAR_LOCATIONS_FROM_LIST';
export const clearLocationsFromList = () => {
  return {
    type: CLEAR_LOCATIONS_FROM_LIST
  }
};

export const CREATE_US_LOCATIONS_LIST = 'CREATE_US_LOCATIONS_LIST';
export const createUsLocationsList = () => {
  return {
    type: CREATE_US_LOCATIONS_LIST
  }
};

export const CREATE_STATE_LOCATIONS_LIST = 'CREATE_STATE_LOCATIONS_LIST';
export const createStateLocationsList = (stateName) => {
  return {
    type: CREATE_STATE_LOCATIONS_LIST,
    stateName
  }
};
///////////////////////////////////////////////////////////////////////////////
// other - END
///////////////////////////////////////////////////////////////////////////////
// export const GET_ALL_LOCATIONS_FROM_CACHE = 'GET_ALL_LOCATIONS_FROM_CACHE';
// export const getAllLocationsFromCache = () => {
//   return {
//     type: GET_ALL_LOCATIONS_FROM_CACHE
//   }
// };
