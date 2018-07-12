import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createStateLocationsList,
  setMapGeoCenter
} from '../../actions/action_locations';
import mapSelectInputConfig from '../../configs/mapSelectInputConfig';
import stateAbbrToNameConfig from '../../configs/stateAbbrToNameConfig';
import './filter_select_input.css';

class FilterSelectInput extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ""}
  }

  buildOptions() {
    // console.log('FilterSelectInput buildOptions ran');
    // console.log('this.props.mapSelectInputType = ', this.props.mapSelectInputType);

    // Select Input when "US" radio button chosen.
    if(this.props.mapSelectInputType === 'us') {
      return (
        <option
          disabled={true}
          value={this.state.value}
        >
          Not Applicable for Filter By: US
        </option>
      )
    }

    // Select Input when "US States" radio button chosen.
    if(this.props.mapSelectInputType === 'state') {

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
    if(this.props.mapSelectInputType === 'nearme') {
      return mapSelectInputConfig.nearmeRadius.map((radius, index) => {
        return (
          <option
            key={index}
            value={radius}
          >
            {radius}
          </option>
        )
      })
    }
  }

  handleOnChangeSelect(e) {
    console.log('FilterSelectInput.js handleOnChangeSelect ran');
    console.log('FilterSelectInput.js handleOnChangeSelect e.target.value', e.target.value);
    this.setState({value: e.target.value});
    // call action creator to populate Locations List.
    console.log('FilterSelectInput.js this.props.mapSelectInputType = ', this.props.mapSelectInputType);

    // Case when "USA" radio button selected.  Not needed, USA select Input is empty.

    // Case when "States" radio button selected.
    if(this.props.mapSelectInputType === 'state') {
      this.props.setMapGeoCenter(e.target.value);
      this.props.createStateLocationsList(e.target.value)
    }

    // Case when "Nearme" radio button selected.
    // TODO - code this up.

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
            {this.buildOptions()}
          </select>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mapSelectInputType: state.mapSelectInput.mapSelectInputType,
    cachedLocations: state.mapData.cachedLocations
  }
};

export default connect(mapStateToProps, {
  createStateLocationsList,
  setMapGeoCenter
})(FilterSelectInput);