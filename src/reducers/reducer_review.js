import { SET_IS_ADD_REVIEW_FORM_OPEN } from '../actions/action_review';

const initialState = {
  isAddReviewFormOpen: false
};

export default (state=initialState, action) => {
  console.log('reducer_review.js action = ', action);
  switch (action.type) {
    case SET_IS_ADD_REVIEW_FORM_OPEN:
      return {
        ...state,
        isAddReviewFormOpen: action.bool
      };

    default:
      return state;
  }
}