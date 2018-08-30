// TODO - keep or discard Root.js
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // {auth: {authenticated: localStorage.getItem('token')}}, // moved to reducer_auth initialState.
  applyMiddleware(reduxThunk)
);

export default ( {children}) => {

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}