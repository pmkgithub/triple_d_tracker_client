'use strict';
const ROOT_URL = 'http://localhost:8080/api';

///////////////////////////////////////////////////////////////////////////////
// GET Reviews - BEGIN
///////////////////////////////////////////////////////////////////////////////
export const fetchReviews = () => dispatch => {
  // fetchReviews called when:
  // 1) User refreshes Browser.
  const userId = localStorage.getItem("userId");
  dispatch(fetchReviewsRequest());
  fetch(`${ROOT_URL}/reviews/${userId}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "authorization": localStorage.getItem('token')
    },
  })
    .then(res => {
      // // This version of code generates error === "Unauthorized"
      // // res.statusText === "Unauthorized" What generates this text?
      // if (!res.ok) {
      //   return Promise.reject(res.statusText);
      // }
      // This version of code generates custom error message.
      if (!res.ok) {
        const customErrorMessage = 'Something went wrong fetching Reviews';
        return Promise.reject(customErrorMessage)
      }
      return res.json();
    })
    .then(response => {
      const reviews = response.reviews;
      console.log('action_reviews.js fetchReviews');
      dispatch(setReviews(reviews));
    })
    .catch(err => {
      dispatch(createReviewError(err));
    });

};
export const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST';
export const fetchReviewsRequest = () => ({
  type: FETCH_REVIEWS_REQUEST,
});

///////////////////////////////////////////////////////////////////////////////
// GET Reviews - END
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// POST Review - BEGIN
///////////////////////////////////////////////////////////////////////////////
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
  })
  .then(response => {

    // TODO - When a review is successfully saved, do what?
    dispatch(createReviewSuccess());

    // redirect to protected resource.
    callback();
  })
  .catch(err => {
    dispatch(createReviewError(err));
  });
};

export const FETCH_CREATE_REVIEW_REQUEST = 'FETCH_CREATE_REVIEW_REQUEST';
export const fetchCreateReviewRequest = () => ({
  type: FETCH_CREATE_REVIEW_REQUEST,
});

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

///////////////////////////////////////////////////////////////////////////////
// Other Action Creators - BEGIN
///////////////////////////////////////////////////////////////////////////////
// On sign-in, API sends User Schema's REVIEWS array to Client.
// This Action Creator is used in /actions/index.js "signin".
export const SET_REVIEWS = 'SET_REVIEWS';
export const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    reviews
  }
};
///////////////////////////////////////////////////////////////////////////////
// Other Action Creators - END
///////////////////////////////////////////////////////////////////////////////