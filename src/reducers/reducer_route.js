import { SET_CURRENT_ROUTE } from '../actions/action_route';

const initialState = {
  currentRoute: null
};

export default (state=initialState, action) => {

  switch(action.type) {
    case SET_CURRENT_ROUTE:
      console.log('action = ', action);
      return {
        ...state,
        currentRoute: action.route
      };

    default:
      return state;
  }
}