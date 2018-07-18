import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createStateLocationsList,
  // setMapGeoCenter,
  setLatLonZoomForUiList
} from '../../actions/action_locations';
import mapSelectInputConfig from '../../configs/mapSelectInputConfig';
import radioButtonConfig from '../../configs/radioButtonConfig';
import mapConfig from "../../configs/mapConfig";
import stateAbbrToNameConfig from '../../configs/stateAbbrToNameConfig';
import stateNameToAbbrConfig from '../../configs/stateNameToAbbrConfig';
import './filter_select_input.css';

class FilterSelectInput extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ""}
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

      // Build <options>.
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
    this.setState({value: e.target.value});
    let uiListRecenterCoords  = {};
    // Case when "USA" radio button is selected.
    // Note: Not needed, USA Select Input is empty.
    // TODO - refact for SET_LAT_LON_ZOOM_FOR_UI_LIST
    // Note: this.props.setMapGeoCenter('US') for USA occurs in FilterRadioButton.js.

    // TODO - refact for SET_LAT_LON_ZOOM_FOR_UI_LIST
    if (this.props.selectedRadioButton === radioButtonConfig.state) {
      // Case when "US States" radio button is selected.
      // Get the US State from e.target.value.
      console.log('FilterSelectInput.js handleOnChangeSelect e.target.value = ', e.target.value);
      const selectedUsStateAbbr = stateNameToAbbrConfig[e.target.value];
       uiListRecenterCoords  = {
        lat: mapConfig[selectedUsStateAbbr].lat,
        lon: mapConfig[selectedUsStateAbbr].lon,
        zoom: mapConfig[selectedUsStateAbbr].zoom
      };
      console.log('FilterSelectInput.js handleOnChangeSelect uiListRecenterCoords =', uiListRecenterCoords);
      // this.props.setMapGeoCenter(e.target.value);// Store the selected US State.
      this.props.setLatLonZoomForUiList(uiListRecenterCoords);
      this.props.createStateLocationsList(e.target.value);
    }

    // Case when "Nearme" radio button is selected.
    if (this.props.selectedRadioButton === radioButtonConfig.nearme) {

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
          >
            {this.props.selectedRadioButton === 'us'? <option value="choose_country" selected disabled>Not Applicable for Filter By: US</option> : ''}
            {this.props.selectedRadioButton === 'state'? <option value="choose_us_state" disabled>Choose a US State</option> : ''}
            {this.props.selectedRadioButton === 'nearme'? <option value="choose_nearme" disabled>Choose a Near Me Distance</option> : ''}
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
  // TODO - refact for SET_LAT_LON_ZOOM_FOR_UI_LIST code for deletion.
  // setMapGeoCenter,
  setLatLonZoomForUiList
})(FilterSelectInput);