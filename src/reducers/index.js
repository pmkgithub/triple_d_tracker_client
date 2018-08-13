import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducer_auth';
import locationsReducer from './reducer_locations';
import radioButtonReducer from './reducer_radio_button';
import modalReducer from './reducer_modal';
import reviewsReducer from './reducer_reviews';
import currentRouteReducer from './reducer_currentRoute';

export default combineReducers({
  auth: authReducer,
  mapData: locationsReducer,
  radioButton: radioButtonReducer,
  modal: modalReducer,
  reviews: reviewsReducer,
  currentRoute: currentRouteReducer,
  form: formReducer
});
