export const SET_IS_MODAL_OPEN = 'SET_IS_MODAL_OPEN';
export const setIsModalOpen = (bool) => {
  return {
    type: SET_IS_MODAL_OPEN,
    isModalOpen: bool
  }
};

export const SET_LOCATION_ID = 'SET_LOCATION_ID';
export const setLocationId = (locationId) => {
  return {
    type: SET_LOCATION_ID,
    locationId
  }
};