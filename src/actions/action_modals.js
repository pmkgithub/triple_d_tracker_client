export const SET_IS_LOCATION_MODAL_OPEN = 'SET_IS_LOCATION_MODAL_OPEN';
export const setIsLocationModalOpen = (bool) => {
  return {
    type: SET_IS_LOCATION_MODAL_OPEN,
    isLocationModalOpen: bool
  }
};

export const SET_IS_ADD_REVIEW_MODAL_OPEN = 'SET_IS_ADD_REVIEW_MODAL_OPEN';
export const setIsAddReviewModalOpen = (bool) => {
  console.log('action_modals.js setIsAddReviewModalOpen ran: bool = ', bool);
  return {
    type: SET_IS_ADD_REVIEW_MODAL_OPEN,
    isAddReviewModalOpen: bool
  }
};

export const SET_LOCATION_ID = 'SET_LOCATION_ID';
export const setLocationId = (locationId) => {
  return {
    type: SET_LOCATION_ID,
    locationId
  }
};

