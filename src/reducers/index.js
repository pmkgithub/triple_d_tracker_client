import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducer_auth';
import locationsReducer from './reducer_locations';
import mapSelectInputReducer from './reducer_map_select_input'

export default combineReducers({
  auth: authReducer,
  mapData: locationsReducer,
  mapSelectInput: mapSelectInputReducer,
  form: formReducer
});
