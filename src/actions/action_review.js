export const SET_IS_ADD_REVIEW_FORM_OPEN = 'SET_IS_ADD_REVIEW_FORM_OPEN';
export const setIsAddReviewFormOpen = (bool) => {
  console.log('action_reviews.js setIsAddReviewFormOpen ran: bool = ', bool);
  return {
    type: SET_IS_ADD_REVIEW_FORM_OPEN,
    isAddReviewFormOpen: bool
  }
};