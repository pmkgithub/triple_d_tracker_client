// import React from 'react';
// import {shallow} from 'enzyme';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
//
// import App from '../App';
// import Nav from '../Nav';
//
// describe('<App /> component', () => {
//
//   // create store with a dummy/empty reducer.
//   const store = createStore(() => {return {}});
//
//   it('Smoke Test', () => {
//     shallow(<Provider store={store}><App /></Provider>)
//   });
//
//   it('has className app', () => {
//     const wrapped = shallow(<Provider store={store}><App /></Provider>);
//     console.log(wrapped.debug());
//     const wrapper = shallow(<App />);
//     console.log(wrapper.debug());
//     // console.log('wrapped.childAt(1)', wrapped.childAt(1).find(Nav));
//     // expect(wrapped.hasClass('app').toEqual(true));
//   });
//
//   // it('shows the Nav component', () => {
//   //   const wrapped = shallow(<Provider store={store}><App /></Provider>);
//   //   console.log('wrapped.find(Nav).length = ', wrapped.find(Nav).length); // 0?
//   //   // console.log('wrapped.find() = ', wrapped.find());
//   //   expect(wrapped.find(Nav).length).toEqual(1);
//   // });
//
// });

import React from 'react';
import {shallow} from 'enzyme';
import Root from '../../Root';
import App from '../App';
import Nav from '../Nav';

describe('<App /> component', () => {

  it('Smoke Test', () => {
    shallow(
      <Root>
        <App />
      </Root>)
  });

  // it('has className app', () => {
  //   const wrapped = shallow(<Provider store={store}><App /></Provider>);
  //   console.log(wrapped.debug());
  //   const wrapper = shallow(<App />);
  //   console.log(wrapper.debug());
  //   // console.log('wrapped.childAt(1)', wrapped.childAt(1).find(Nav));
  //   // expect(wrapped.hasClass('app').toEqual(true));
  // });

  // it('shows the Nav component', () => {
  //   const wrapped = shallow(<Provider store={store}><App /></Provider>);
  //   console.log('wrapped.find(Nav).length = ', wrapped.find(Nav).length); // 0?
  //   // console.log('wrapped.find() = ', wrapped.find());
  //   expect(wrapped.find(Nav).length).toEqual(1);
  // });

});