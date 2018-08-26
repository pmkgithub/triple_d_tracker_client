import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  clearLocationsFromList,
  createUsLocationsList,
  createVisitedLocationsUiList,
  setLatLonZoomForUiList,
  setUsersNearmeData,
  setMapZoom
} from '../../actions/action_locations';
import {
  setSelectedRadioButton
} from '../../actions/action_radio_button';
import radioButtonConfig from '../../configs/radioButtonConfig';
import mapConfig from '../../configs/mapConfig';
import './filter_radio_buttons_select_input.css';

class FilterRadioButtons extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedRadioButton: 'us' };
  }

  handleOnChange(e) {
    let uiListRecenterCoords;
    const radioButtonValue = e.target.value;
    this.setState({selectedRadioButton: radioButtonValue});

    // USA radio button.
    if (radioButtonValue === radioButtonConfig.us) {

      this.props.setSelectedRadioButton(radioButtonValue); // controls Map Filter Select Input.

      let zoom = mapConfig.US.zoom;
      // When in "mobile" screen size (e.g. below 1260px for this app),
      // set map zoom for "mobile" zoom.
      if(window.innerWidth <= 1260) {
        zoom = zoom - 1;
      }

      // For clicking "Map All Listed Locations" button - BEGIN.
      // Store the US's re-center coords.
      // uiListRecenterCoords needed when User clicks "Map All Listed Locations" button.
      uiListRecenterCoords = {
        lat: mapConfig.US.lat,
        lon: mapConfig.US.lon,
        zoom: zoom
      };
      this.props.setLatLonZoomForUiList(uiListRecenterCoords);
      // For clicking "Map All Listed Locations" button - END.

      this.props.clearLocationsFromList();

      // When User re-clicks USA button.
      this.props.createUsLocationsList(zoom);
    }

    // US STATE radio button.
    if (radioButtonValue === radioButtonConfig.state) {
      this.props.setSelectedRadioButton(radioButtonValue);
      // Note: for US States, setLatLonZoomForUiList() occurs when a US State is selected from Select Input.
      this.props.clearLocationsFromList();
    }

    // NEARME radio button.
    if (radioButtonValue === radioButtonConfig.nearme) {

      this.props.setSelectedRadioButton(radioButtonValue);
      // Note 1:
      //    "nearme", values for setLatLonZoomForUiList()
      //    are set when a "nearme" distance is selected from Select Input.

      // NOTE 2:
      //    Each time the "nearme" radio button is clicked,
      //    setUsersNearmeData() needs to be called and data cleared,
      //    so the User's Location marker doesn't display when User
      //    re-selects the "nearme" button.
      const usersNearmeData = {
        distanceMeters: '',
        lat: '',
        lon: ''
      };
      this.props.setUsersNearmeData(usersNearmeData);

      this.props.clearLocationsFromList();
      // NOTE: No need to createNearmeLocationsUiList action/reducer b/c this
      //       list data is re-fectched on each "nearme" Select Input selection.
    }

    // VISITED radio button.
    if (radioButtonValue === radioButtonConfig.visited) {

      this.props.setSelectedRadioButton(radioButtonValue);

      // For clicking "Map All Listed Locations" button - BEGIN.
      // Store the US's re-center coords.
      // uiListRecenterCoords needed when User clicks "Map All Listed Locations" button.
      uiListRecenterCoords = {
        lat: mapConfig.US.lat,
        lon: mapConfig.US.lon,
        zoom: mapConfig.US.zoom
      };
      this.props.setLatLonZoomForUiList(uiListRecenterCoords);
      // For clicking "Map All Listed Locations" button - END.

      this.props.clearLocationsFromList();
      this.props.createVisitedLocationsUiList();  // when User re-clicks Visited button.
    }
  }

  render()  {
    return (
      <div className="filter_radio_buttons_wrapper">
        <div className="filter_radio_button_header">Filter By:</div>
        <form className="form_filter_radio_buttons">
          <div className="filter_radio_button">
            <input
              id="radio_us"
              type="radio"
              name="filter_by"
              value="us"
              checked={this.state.selectedRadioButton === radioButtonConfig.us}
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
              checked={this.state.selectedRadioButton === radioButtonConfig.state}
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
              checked={this.state.selectedRadioButton === radioButtonConfig.nearme}
              onChange={e => this.handleOnChange(e)}
            />
            <label htmlFor="radio_nearme">Near Me</label>
          </div>
          <div className="filter_radio_button">
            <input
              id="radio_visited"
              type="radio"
              name="filter_by"
              value="visited"
              checked={this.state.selectedRadioButton === radioButtonConfig.visited}
              onChange={e => this.handleOnChange(e)}
            />
            <label htmlFor="radio_states">Visited</label>
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
  createVisitedLocationsUiList,
  setSelectedRadioButton,
  setUsersNearmeData,
  setMapZoom
})(FilterRadioButtons);