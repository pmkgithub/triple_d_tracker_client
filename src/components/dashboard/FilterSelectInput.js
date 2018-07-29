import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createStateLocationsList,
  setLatLonZoomForUiList
} from '../../actions/action_locations';
import mapSelectInputConfig from '../../configs/mapSelectInputConfig';
import radioButtonConfig from '../../configs/radioButtonConfig';
import mapConfig from "../../configs/mapConfig";
import stateAbbrToNameConfig from '../../configs/stateAbbrToNameConfig';
import stateNameToAbbrConfig from '../../configs/stateNameToAbbrConfig';
import './filter_radio_buttons.css';

class FilterSelectInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      size: "0"
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
    this.setState({
      value: e.target.value,
      // size: "0",
      // height: "30px"
    });
    let uiListRecenterCoords  = {};
    // Note: Don't need an if stmt for USA, b/c USA Select Input is empty.
    // Note: this.props.setLatLonZoomForUiList(uiListRecenterCoords) for USA occurs in FilterRadioButton.js.

    if (this.props.selectedRadioButton === radioButtonConfig.state) {
      // Case when "US States" radio button has been selected.
      const usStateName = e.target.value;
      const usStateAbbr = stateNameToAbbrConfig[usStateName];

       uiListRecenterCoords  = {
        lat: mapConfig[usStateAbbr].lat,
        lon: mapConfig[usStateAbbr].lon,
        zoom: mapConfig[usStateAbbr].zoom
      };

      this.props.setLatLonZoomForUiList(uiListRecenterCoords);  // Store the selected US State's re-center coords.
      this.props.createStateLocationsList(usStateName);
    }

    if (this.props.selectedRadioButton === radioButtonConfig.nearme) {
      // Case when "Nearme" radio button has been selected.
    }

  }

  // handleOnFocus() {
  //   console.log('this.props.selectedRadioButton = ', this.props.selectedRadioButton);
  //   if(this.props.selectedRadioButton !== radioButtonConfig.us) {
  //     this.setState({size: "5", height: "100px"});
  //   }
  // }
  //
  // handleOnBlur() {
  //   if(this.props.selectedRadioButton !== radioButtonConfig.us) {
  //     this.setState({size: "0", height: "30px"});
  //   }
  // }

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
            // onFocus={() => {this.handleOnFocus()}}
            // onBlur={() => {this.handleOnBlur()}}
          >
            {this.props.selectedRadioButton === 'us'? <option value="choose_country" selected disabled>Not Applicable for Filter By: USA</option> : ''}
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
  setLatLonZoomForUiList
})(FilterSelectInput);