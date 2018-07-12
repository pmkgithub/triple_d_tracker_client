import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  clearLocationsFromList,
  createUsLocationsList,
  setMapGeoCenter
} from '../../actions/action_locations';
import {
  setMapSelectInputType
} from '../../actions/action_map_select_input';
import mapSelectInputConfig from '../../configs/mapSelectInputConfig';
import './filter_radio_buttons.css';

class FilterRadioButtons extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedRadio: mapSelectInputConfig.us };
  }

  handleOnChange(e) {
    const radioButtonValue = e.target.value;
    this.setState({selectedRadio: radioButtonValue});

    if (radioButtonValue === mapSelectInputConfig.us) {
      this.props.setMapSelectInputType(radioButtonValue); // controls Map Filter Select Input.
      this.props.setMapGeoCenter('US');
      this.props.clearLocationsFromList();
      this.props.createUsLocationsList();
    }

    if (radioButtonValue === mapSelectInputConfig.state) {
      this.props.setMapSelectInputType(radioButtonValue);
      // Note: for States, setMapGeoCenter() occurs when a State is selected from Select Input.
      this.props.clearLocationsFromList();
    }
    if (radioButtonValue === mapSelectInputConfig.nearme) {
      this.props.setMapSelectInputType(radioButtonValue);
    }
  }

  render()  {
    return (
      <div>
        <div className="filter_radio_button_header">Filter By:</div>
        <form className="form_filter_radio_buttons">
          <div className="filter_radio_button">
            <input
              id="radio_us"
              type="radio"
              name="filter_by"
              value="us"
              checked={this.state.selectedRadio==='us'}
              onChange={e => this.handleOnChange(e)}
            />
            <label htmlFor="radio_us">USA</label>
          </div>
          <div className="filter_radio_button">
            <input
              id="radio_states"
              type="radio"
              name="filter_by"
              value="state"
              checked={this.state.selectedRadio==='state'}
              onChange={e => this.handleOnChange(e)}
            />
            <label htmlFor="radio_states">States</label>
          </div>
          <div className="filter_radio_button">
            <input
              id="radio_nearme"
              type="radio"
              name="filter_by"
              value="nearme"
              checked={this.state.selectedRadio==='nearme'}
              onChange={e => this.handleOnChange(e)}
            />
            <label htmlFor="radio_nearme">Near Me</label>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, {
  setMapGeoCenter,
  clearLocationsFromList,
  createUsLocationsList,
  setMapSelectInputType
})(FilterRadioButtons);