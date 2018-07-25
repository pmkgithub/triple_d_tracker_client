export const SET_IS_MODAL_OPEN = 'SET_IS_MODAL_OPEN';
export const setIsModalOpen = (bool) => {
  return {
    type: SET_IS_MODAL_OPEN,
    isModalOpen: bool
  }
};

export const SET_MODAL_VIEW = 'SET_MODAL_VIEW';
export const setModalView = (modalView) => {
  return {
    type: SET_MODAL_VIEW,
    modalView: modalView
  }
};
