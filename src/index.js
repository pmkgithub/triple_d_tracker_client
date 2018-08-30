// import React from 'react';
// import ReactDom from 'react-dom';
// import { BrowserRouter, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import reduxThunk from 'redux-thunk';
//
// import reducers from './reducers';
// import App from './components/App';
// import Signup from './components/auth/Signup';
// import Signin from './components/auth/Signin';
// import Signout from './components/auth/Signout';
// import About from './components/About';
// import Dashboard from './components/dashboard/Dashboard';
//
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
//         <Route exact path="/" component={Signup} />
//         <Route exact path="/signup" component={Signup} />
//         <Route exact path="/signin" component={Signin} />
//         <Route exact path="/signout" component={Signout} />
//         <Route exact path="/about" component={About} />
//         <Route exact path="/dashboard" component={Dashboard} />
//       </App>
//     </BrowserRouter>
//   </Provider>,
//   document.querySelector('#root')
// );

import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Root from './Root';
import App from './components/App';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import About from './components/About';
import Dashboard from './components/dashboard/Dashboard';

ReactDom.render(
  <Root>
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Signup} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signout" component={Signout} />
        <Route exact path="/about" component={About} />
        <Route exact path="/dashboard" component={Dashboard} />
      </App>
    </BrowserRouter>
  </Root>,
  document.querySelector('#root')
);