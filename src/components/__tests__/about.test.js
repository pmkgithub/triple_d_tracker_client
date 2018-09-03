import React from 'react';
import {shallow } from 'enzyme';
import { About } from "../About";
import '../../setupTests';

describe('<About /> ',() => {

  it('renders without crashing', () => {
    const mockFunc = jest.fn();

    const wrapper = shallow(<About setCurrentRoute={mockFunc}/>);
    console.log(wrapper.debug);

  })
});