import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  clearLocationsFromList,
  createUsLocationsList,
  setLatLonZoomForUiList
} from '../../actions/action_locations';
import {
  selectedRadioButton
} from '../../actions/action_radio_button';
import radioButtonConfig from '../../configs/radioButtonConfig';
import mapConfig from '../../configs/mapConfig';
import './filters.css';

class FilterRadioButtons extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedRadio: 'us' };
  }

  handleOnChange(e) {
    const radioButtonValue = e.target.value;
    this.setState({selectedRadio: radioButtonValue});

    if (radioButtonValue === radioButtonConfig.us) {

      const uiListRecenterCoords = {
        lat: mapConfig.US.lat,
        lon: mapConfig.US.lon,
        zoom: mapConfig.US.zoom
      };

      this.props.selectedRadioButton(radioButtonValue); // controls Map Filter Select Input.
      this.props.setLatLonZoomForUiList(uiListRecenterCoords);
      this.props.clearLocationsFromList();
      this.props.createUsLocationsList();
    }

    if (radioButtonValue === radioButtonConfig.state) {
      this.props.selectedRadioButton(radioButtonValue);
      // Note: for US States, setLatLonZoomForUiList() occurs when a US State is selected from Select Input.
      this.props.clearLocationsFromList();
    }
    if (radioButtonValue === radioButtonConfig.nearme) {
      this.props.selectedRadioButton(radioButtonValue);
      // Note: for "nearme", setMapGeoCenter() occurs when a "nearme" distance is selected from Select Input.
      this.props.clearLocationsFromList();
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
              checked={this.state.selectedRadio === radioButtonConfig.us}
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
              checked={this.state.selectedRadio === radioButtonConfig.state}
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
              checked={this.state.selectedRadio === radioButtonConfig.nearme}
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
  setLatLonZoomForUiList,
  clearLocationsFromList,
  createUsLocationsList,
  selectedRadioButton
})(FilterRadioButtons);