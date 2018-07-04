const ROOT_URL = 'http://localhost:8080/api';

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
      console.log('fetchLocationsRequest locations', locations);
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