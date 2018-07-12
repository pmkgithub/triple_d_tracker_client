import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createStateLocationsList
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

    // Select Input when US radio button chosen.
    if(this.props.mapSelectInputType === mapSelectInputConfig.us) {
      return (
        <option
          disabled={true}
          value={this.state.value}
        >
          Not Applicable for Filter By: US
        </option>
      )
    }

    // Select Input when State radio button chosen.
    if(this.props.mapSelectInputType === mapSelectInputConfig.state) {

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

    // Select Input when Nearme radio button chosen.
    if(this.props.mapSelectInputType === mapSelectInputConfig.nearme) {
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
    console.log('FilterSelectInput handleOnSelect ran');
    console.log('FilterSelectInput handleOnSelect e.target.value', e.target.value);
    this.setState({value: e.target.value});
    // call action creator to populate Locations List.
    console.log('FilterSelectInput.js this.props.mapSelectInputType = ', this.props.mapSelectInputType);

    // Case when State radio button selected.
    if(this.props.mapSelectInputType === 'state') {
      this.props.createStateLocationsList(e.target.value)
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

export default connect(mapStateToProps, { createStateLocationsList })(FilterSelectInput);