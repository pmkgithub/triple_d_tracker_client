import React from 'react';
import {shallow } from 'enzyme';
import { FilteredLocationsList } from "../FilteredLocationsList";
import '../../../setupTests';


describe('<FilteredLocationsList />', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(<FilteredLocationsList />);


  });

});