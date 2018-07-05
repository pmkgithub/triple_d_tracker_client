import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducer_auth';
import locationsReducer from './reducer_locations';

export default combineReducers({
  auth: authReducer,
  mapData: locationsReducer,
  form: formReducer
});
