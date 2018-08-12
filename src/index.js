import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import Dashboard from './components/dashboard/Dashboard';
import LandingPage from './components/LandingPage';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Feature from './components/Feature';
import About from './components/About';

// // TODO - orig - refact-layout - BEGIN
// // NOTE store is imported into action_locations.js to have access to reviews.
// export const store = createStore(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   // {auth: {authenticated: localStorage.getItem('token')}}, // moved to reducer_auth initialState.
//   applyMiddleware(reduxThunk)
// );
//
// ReactDom.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App>
//         <Route exact path="/" component={Dashboard} />
//         <Route path="/signup" component={Signup} />
//         <Route path="/feature" component={Feature} />
//         <Route path="/signout" component={Signout} />
//         <Route path="/signin" component={Signin} />
//       </App>
//     </BrowserRouter>
//   </Provider>,
//   document.querySelector('#root')
// );
// // TODO - orig - refact-layout - END

// TODO - refact - refact-layout - BEGIN
// NOTE store is imported into action_locations.js to have access to reviews.
export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // {auth: {authenticated: localStorage.getItem('token')}}, // moved to reducer_auth initialState.
  applyMiddleware(reduxThunk)
);

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        {/*<Route exact path="/" component={LandingPage} />*/}
        <Route exact path="/" component={Signin} />
        <Route exact path="/about" component={About} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signout" component={Signout} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
// TODO - refact - refact-layout - END