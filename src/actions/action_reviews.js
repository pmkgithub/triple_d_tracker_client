// On sign-in, API sends User Schema's REVIEWS array to Client.
// This Action Creator is used in /actions/index.js "signin".
export const SET_REVIEWS_ON_SIGNIN = 'SET_REVIEWS_ON_SIGNIN';
export const setReviewsOnSignin = (reviews) => {
  console.log('action_reviews.js setReviewsOnSignin reviews = ', reviews);
  return {
    type: SET_REVIEWS_ON_SIGNIN,
    reviews
  }
};

///////////////////////////////////////////////////////////////////////////////
// POST Review - BEGIN
///////////////////////////////////////////////////////////////////////////////
const ROOT_URL = 'http://localhost:8080/api';
export const createReview = ( formData, callback ) => dispatch => {
  dispatch(fetchCreateReviewRequest());
  fetch(`${ROOT_URL}/reviews/add`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": localStorage.getItem('token')
    },
    body: JSON.stringify(formData)
  })
    .then(res => {
      // // This version of code generates error === "Unauthorized"
      // // res.statusText === "Unauthorized" What generates this text?
      // if (!res.ok) {
      //   return Promise.reject(res.statusText);
      // }
      // This version of code generates custom error message.
      if (!res.ok) {
        const customErrorMessage = 'Invalid Email or Password';
        return Promise.reject(customErrorMessage)
      }
      return res.json();
    }).then(response => {
    // get token from response, place in localstorage or keep token in Redux?
    console.log('action_modal.js createReview response = ', response);

    // TODO - add the returned review, and visitedLocation to Redux.
    dispatch(createReviewSuccess());

    // redirect to protected resource.
    callback();

  }).catch(err => {
    dispatch(createReviewError(err));
  });
};

export const FETCH_CREATE_REVIEW_REQUEST = 'FETCH_CREATE_REVIEW_REQUEST';
export const fetchCreateReviewRequest = () => ({
  type: FETCH_CREATE_REVIEW_REQUEST,
});

// TODO - finish
export const CREATE_REVIEW_SUCCESS = 'CREATE_REVIEW_SUCCESS';
export const createReviewSuccess = () => ({
  type: CREATE_REVIEW_SUCCESS,
});

export const CREATE_REVIEW_ERROR = 'CREATE_REVIEW_ERROR';
export const createReviewError = (err) => ({
  type: CREATE_REVIEW_ERROR,
  err
});
///////////////////////////////////////////////////////////////////////////////
// POST Review - END
///////////////////////////////////////////////////////////////////////////////