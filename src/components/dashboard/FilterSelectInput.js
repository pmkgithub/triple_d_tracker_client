import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createStateLocationsList,
  setLatLonZoomForUiList,
  setIsGeolocating,
  setUsersNearmeData,
  fetchNearmeLocations,
  clearLocationsFromList
} from '../../actions/action_locations';
import mapSelectInputConfig from '../../configs/mapSelectInputConfig';
import radioButtonConfig from '../../configs/radioButtonConfig';
import mapConfig from "../../configs/mapConfig";
import stateAbbrToNameConfig from '../../configs/stateAbbrToNameConfig';
import stateNameToAbbrConfig from '../../configs/stateNameToAbbrConfig';
import './filter_radio_buttons_select_input.css';

class FilterSelectInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      size: "0",
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedRadioButton === radioButtonConfig.state) {
      this.setState({value: 'choose_us_state'});
    }
    if (nextProps.selectedRadioButton === radioButtonConfig.nearme) {
      this.setState({value: 'choose_nearme'});
    }
  }

  buildOptions() {

    // Select Input when "US States" radio button chosen.
    if (this.props.selectedRadioButton === radioButtonConfig.state) {

      // this.setState({value: 'choose_us_state'});
      // Build states array represented in the entire list of states from DB,
      // which are cached during initial fetch. Stored in state.cachedLocations.
      let states = [];
      this.props.cachedLocations.forEach(location => {
        if ( states.indexOf(stateAbbrToNameConfig[location.state]) === -1 )  {
          states.push(stateAbbrToNameConfig[location.state]);
        }
        states.sort();
      });

      return states.map((stateName, index) => {
        return (
          <option
            key={index}
            value={stateName}
          >
            {stateName}
          </option>
        )
      });

    }

    // Select Input when "nearme" radio button chosen.
    if(this.props.selectedRadioButton === radioButtonConfig.nearme) {
      return mapSelectInputConfig.nearmeDistance.map((distance, index) => {
        return (
          <option
            key={index}
            value={distance}
          >
            {distance}
          </option>
        )
      })
    }
  }

  handleOnChangeSelect(e) {
    // Note: On a State Select Input, e.target.value = the State's name (e.g. "Arizona").
    this.setState({
      value: e.target.value,
      // size: "0",
      // height: "30px"
    });
    let uiListRecenterCoords  = {};

    // Note: Don't need an if stmt for USA, b/c USA Select Input is empty.
    // Note: this.props.setLatLonZoomForUiList(uiListRecenterCoords) for USA occurs in FilterRadioButton.js.

    // Note: Don't need an if stmt for "Visited", b/c "Visited" Select Input is empty.
    // Note: this.props.setLatLonZoomForUiList(uiListRecenterCoords) for "Visited" occurs in FilterRadioButton.js.

    // US STATE - Select Input
    if (this.props.selectedRadioButton === radioButtonConfig.state) {
      // Case when "US States" radio button has been selected.
      const usStateName = e.target.value;
      const usStateAbbr = stateNameToAbbrConfig[usStateName];

      // TODO - responsive / mobile zoom
      // set usStateAbbr - for setResponsiveZoom() in Map.js

      // For clicking "Map All Listed Locations" button - BEGIN.
      // Store the selected US State's re-center coords.
      // uiListRecenterCoords needed when User clicks "Map All Listed Locations" button.
      uiListRecenterCoords  = {
        lat: mapConfig[usStateAbbr].lat,
        lon: mapConfig[usStateAbbr].lon,
        zoom: mapConfig[usStateAbbr].zoom
      };
      this.props.setLatLonZoomForUiList(uiListRecenterCoords);
      // For clicking "Map All Listed Locations" button - END.

      this.props.createStateLocationsList(usStateAbbr);
    }

    // NEARME - Select Input.
    if (this.props.selectedRadioButton === radioButtonConfig.nearme) {
      if (navigator.geolocation) {
        // clear Locations List (and displayed map locations).
        this.props.clearLocationsFromList();

        // set isGeolocationg to true so the Finding Nearme Spinner displays
        // isGeolocationSpinner found in Map.js.
        this.props.setIsGeolocating(true);

        // get User's position.
        navigator.geolocation.getCurrentPosition((position) => this.onGeolocateSuccess(position), (error) => this.onGeolocateError(error));
      }
    }
  }

  onGeolocateSuccess(coordinates) {
    // NOTE: mapCenterLat, mapCenterLon is set in FETCH_NEARME_LOCATIONS_SUCCESS.

    let { latitude, longitude } = coordinates.coords;

    // // For making Nearme Map screen captures.
    // // LA lat, lon: 34.0522° N, 118.2437° W
    // latitude = 34.0522;
    // longitude = -118.2437;

    const selectedDistanceMiles = this.state.value;
    // Convert selectedDistance (miles) to meters.
    // mongoose $geoNear requires meters.
    const selectedDistanceMeters = selectedDistanceMiles * 1.60934 * 1000;
    const zoom = mapSelectInputConfig.nearmeZoom[selectedDistanceMiles];

    // set isGeolocating to false, remove spinner from Map.js
    this.props.setIsGeolocating(false);

    // usersNearmeData needed by Map.js to create User's Location Marker.
    const usersNearmeData = {
      distanceMeters: selectedDistanceMeters,
      lat: latitude,
      lon: longitude
    };
    this.props.setUsersNearmeData(usersNearmeData);

    // For clicking "Map All Listed Locations" button - BEGIN.
    // Store the selected Near Me re-center coords.
    // uiListRecenterCoords needed when User clicks "Map All Listed Locations" button.
    const uiListRecenterCoords = {
      lat: latitude,
      lon: longitude,
      zoom: zoom
    };
    this.props.setLatLonZoomForUiList(uiListRecenterCoords);
    // for clicking "Map All Listed Locations" button - END.

    // Fetch Nearme Locations from API.
    this.props.fetchNearmeLocations(usersNearmeData);

  }

  onGeolocateError(error) {
    console.warn(error.code, error.message);

    if (error.code === 1) {
      // they said no
    } else if (error.code === 2) {
      // position unavailable
    } else if (error.code === 3) {
      // timeout
    }
  }

  render() {

    return (
      <div>
        <form>
          <select
            className="filter_select_input"
            value={this.state.value}
            onChange={(e) => {this.handleOnChangeSelect(e)}}
            size={this.state.size}
            height={this.state.height}
          >
            {this.props.selectedRadioButton === 'us'? <option value="choose_country" selected disabled>Not Applicable for Filter By: USA</option> : ''}
            {this.props.selectedRadioButton === 'state'? <option value="choose_us_state" disabled>Choose a US State</option> : ''}
            {this.props.selectedRadioButton === 'visited'? <option value="choose_visited" selected disabled>Not Applicable for Filter By: Visited</option> : ''}
            {this.props.selectedRadioButton === 'nearme'? <option value="choose_nearme" disabled>Choose a Near Me Distance (Miles)</option> : ''}

            {this.buildOptions()}
            </select>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedRadioButton: state.radioButton.selectedRadioButton,
    cachedLocations: state.mapData.cachedLocations
  }
};

export default connect(mapStateToProps, {
  createStateLocationsList,
  setLatLonZoomForUiList,
  setIsGeolocating,
  setUsersNearmeData,
  fetchNearmeLocations,
  clearLocationsFromList
})(FilterSelectInput);