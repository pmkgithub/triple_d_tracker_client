const ROOT_URL = 'http://localhost:8080/api';

///////////////////////////////////////////////////////////////////////////////
// GET Reviews - BEGIN
// Reviews are initially sent to Client when User signs-in, and
// set in Redux.
//
// GET Reviews is for when User refreshes Browser.
// fetchReviews is called:
//   1) in Map.js b/c before fetchLocation() is called.
//      The User's reviews are needed in reducer_locations.js FETCH_LOCATIONS_SUCCESS
//      in order to properly color visited/reviewed locations green.
///////////////////////////////////////////////////////////////////////////////
export const fetchReviews = () => dispatch => {
  const userId = localStorage.getItem("userId");
  dispatch(fetchReviewsRequest());

  // "return" so that multiple AJAX requests in Map.js works.
  return fetch(`${ROOT_URL}/reviews/${userId}`, {
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
      dispatch(fetchReviewsSuccess());        // resets isFetching to false.
      dispatch(setReviews(response.reviews)); // sets the fetched Reviews.
    })
    .catch(err => {
      dispatch(fetchReviewsError(err));
    });

};
export const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST';
export const fetchReviewsRequest = () => ({
  type: FETCH_REVIEWS_REQUEST,
});

export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const fetchReviewsSuccess = () => ({
  type: FETCH_REVIEWS_SUCCESS,
});

export const FETCH_REVIEWS_ERROR = 'FETCH_REVIEWS_ERROR';
export const fetchReviewsError = (err) => ({
  type: FETCH_REVIEWS_ERROR,
  err
});
///////////////////////////////////////////////////////////////////////////////
// GET Reviews - END
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// CREATE Review - BEGIN
///////////////////////////////////////////////////////////////////////////////
export const createReview = ( formData, callback ) => dispatch => {
  dispatch(createReviewRequest());
  fetch(`${ROOT_URL}/reviews/create`, {
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
      const customErrorMessage = 'Something went wrong CREATING a Review';
      return Promise.reject(customErrorMessage)
    }
    return res.json();
  })
  .then(response => {
    dispatch(createReviewSuccess());        // resets isFetching to false.
    dispatch(setReviews(response.reviews)); // sets new set reviews.

    // redirect to Location Details Modal.
    callback();
  })
  .catch(err => {
    dispatch(createReviewError(err));
  });
};

export const CREATE_REVIEW_REQUEST = 'CREATE_REVIEW_REQUEST';
export const createReviewRequest = () => ({
  type: CREATE_REVIEW_REQUEST,
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
// CREATE Review - END
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// GET Review To Edit  - BEGIN
///////////////////////////////////////////////////////////////////////////////
export const SET_REVIEW_TO_EDIT_ID = 'SET_REVIEW_TO_EDIT_ID';
export const setReviewToEditId = (reviewToEditId) => {
  return {
    type: SET_REVIEW_TO_EDIT_ID,
    reviewToEditId
  }
};
export const fetchReviewToEdit = (reviewToEditId) => dispatch => {
  console.log('action_reviews.js reviewToEditId = ', reviewToEditId);
  const userId = localStorage.getItem("userId");
  dispatch(fetchReviewToEditRequest());

  // "return" so that multiple AJAX requests in Map.js works.
  return fetch(`${ROOT_URL}/reviews/${userId}/${reviewToEditId}`, {
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
        const customErrorMessage = 'Something went wrong fetching Review to Edit';
        return Promise.reject(customErrorMessage)
      }
      return res.json();
    })
    .then(review => {
      console.log('fetchReviewToEdit.js response = ', review);
      dispatch(fetchReviewToEditSuccess());        // resets isFetching to false.
      dispatch(setReivewToEdit(review));  // sets the fetched Review to Edit.
    })
    .catch(err => {
      dispatch(fetchReviewToEditError(err));
    });

};
export const FETCH_REVIEW_TO_EDIT_REQUEST = 'FETCH_REVIEW_TO_EDIT_REQUEST';
export const fetchReviewToEditRequest = () => ({
  type: FETCH_REVIEW_TO_EDIT_REQUEST,
});

export const FETCH_REVIEW_TO_EDIT_SUCCESS = 'FETCH_REVIEW_TO_EDIT_SUCCESS';
export const fetchReviewToEditSuccess = () => ({
  type: FETCH_REVIEW_TO_EDIT_SUCCESS,
});

export const FETCH_REVIEW_TO_EDIT_ERROR = 'FETCH_REVIEW_TO_EDIT_ERROR';
export const fetchReviewToEditError = (err) => ({
  type: FETCH_REVIEW_TO_EDIT_ERROR,
  err
});

export const SET_REVIEW_TO_EDIT = 'SET_REVIEW_TO_EDIT';
export const setReivewToEdit = (reviewToEdit) => {
  return {
    type: SET_REVIEW_TO_EDIT,
    reviewToEdit
  }
};

///////////////////////////////////////////////////////////////////////////////
// GET Review To Edit  - END
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// EDIT Review - BEGIN
///////////////////////////////////////////////////////////////////////////////
export const editReview = ( userId, reviewId, toUpdate, callback ) => dispatch => {
  dispatch(editReviewRequest());
  fetch(`${ROOT_URL}/reviews/delete/${userId}/${reviewId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "authorization": localStorage.getItem('token')
    }
  })
    .then(res => {
      // // This version of code generates error === "Unauthorized"
      // // res.statusText === "Unauthorized" What generates this text?
      // if (!res.ok) {
      //   return Promise.reject(res.statusText);
      // }
      // This version of code generates custom error message.
      if (!res.ok) {
        const customErrorMessage = 'Something went wrong EDITING a Review';
        return Promise.reject(customErrorMessage)
      }
      return res.json();
    })
    .then(response => {
      dispatch(editReviewSuccess());          // resets isFetching to false.
      dispatch(setReviews(response.reviews)); // sets update set reviews.

      // redirect to Location Details Modal.
      callback();
    })
    .catch(err => {
      dispatch(editReviewError(err));
    });
};

export const EDIT_REVIEW_REQUEST = 'EDIT_REVIEW_REQUEST';
export const editReviewRequest = () => ({
  type: EDIT_REVIEW_REQUEST,
});

export const EDIT_REVIEW_SUCCESS = 'EDIT_REVIEW_SUCCESS';
export const editReviewSuccess = () => ({
  type: EDIT_REVIEW_SUCCESS,
});

export const EDIT_REVIEW_ERROR = 'DELETE_REVIEW_ERROR';
export const editReviewError = (err) => ({
  type: EDIT_REVIEW_ERROR,
  err
});

///////////////////////////////////////////////////////////////////////////////
// EDIT Review - END
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// DELETE Review - BEGIN
///////////////////////////////////////////////////////////////////////////////
export const deleteReview = ( userId, reviewId, callback ) => dispatch => {
  dispatch(deleteReviewRequest());
  fetch(`${ROOT_URL}/reviews/delete/${userId}/${reviewId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "authorization": localStorage.getItem('token')
    }
  })
    .then(res => {
      // // This version of code generates error === "Unauthorized"
      // // res.statusText === "Unauthorized" What generates this text?
      // if (!res.ok) {
      //   return Promise.reject(res.statusText);
      // }
      // This version of code generates custom error message.
      if (!res.ok) {
        const customErrorMessage = 'Something went wrong DELETING a Review';
        return Promise.reject(customErrorMessage)
      }
      return res.json();
    })
    .then(response => {
      dispatch(deleteReviewSuccess());        // resets isFetching to false.
      dispatch(setReviews(response.reviews)); // sets reviews, minus the deleted review.

      // redirect to Location Details Modal.
      callback();
    })
    .catch(err => {
      dispatch(deleteReviewError(err));
    });
};

export const DELETE_REVIEW_REQUEST = 'DELETE_REVIEW_REQUEST';
export const deleteReviewRequest = () => ({
  type: DELETE_REVIEW_REQUEST,
});

export const DELETE_REVIEW_SUCCESS = 'DELETE_REVIEW_SUCCESS';
export const deleteReviewSuccess = () => ({
  type: DELETE_REVIEW_SUCCESS,
});

export const DELETE_REVIEW_ERROR = 'DELETE_REVIEW_ERROR';
export const deleteReviewError = (err) => ({
  type: DELETE_REVIEW_ERROR,
  err
});
///////////////////////////////////////////////////////////////////////////////
// DELETE Review - END
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// Other Action Creators - BEGIN
///////////////////////////////////////////////////////////////////////////////
// Called in Map.js each time the map renders.
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