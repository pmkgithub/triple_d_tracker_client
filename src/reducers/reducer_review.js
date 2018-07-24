import { } from '../actions/action_review';

const initialState = {
  isAddReviewFormOpen: false
};

export default (state=initialState, action) => {
  // console.log('reducer_review.js action = ', action);
  switch (action.type) {


    default:
      return state;
  }
}