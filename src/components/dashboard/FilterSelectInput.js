import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createStateLocationsList,
  setMapGeoCenter
} from '../../actions/action_locations';
import mapSelectInputConfig from '../../configs/mapSelectInputConfig';
import radioButtonConfig from '../../configs/radioButtonConfig';
import stateAbbrToNameConfig from '../../configs/stateAbbrToNameConfig';
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

    // Case when "USA" radio button is selected.
    // Note: Not needed, USA Select Input is empty.
    // Note: this.props.setMapGeoCenter('US') for USA occurs in FilterRadioButton.js.

    // Case when "States" radio button is selected.
    if (this.props.selectedRadioButton === radioButtonConfig.state) {
      this.props.setMapGeoCenter(e.target.value);
      this.props.createStateLocationsList(e.target.value);
    }

    // Case when "Nearme" radio button is selected.
    if (this.props.selectedRadioButton === radioButtonConfig.state) {

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
  setMapGeoCenter
})(FilterSelectInput);