import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  clearFilteredLocationsList,
  getAllLocationsFromCache,
  mapListedLocations
} from '../../actions/locations';
import mapConfig from '../../map_config/mapConfig';
import './filter_radio_buttons.css';

class FilterRadioButtons extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedRadio: 'us' };
  }

  handleOnChange(e) {
    // console.log('handleOnChange ran, filter = ', filter.selectedRadio);
    const radioButtonValue = e.target.value;
    this.setState({selectedRadio: radioButtonValue});

    if (radioButtonValue === 'us') {
      console.log('build us select input');

      // TODO - build us select input.

      // this.props.getAllLocationsFromCache();
      this.props.mapListedLocations();

      // const recenterData = {
      //   lat: mapConfig.us.lat,
      //   lon: mapConfig.us.lon,
      //   zoom: mapConfig.us.zoom
      // };
      // this.props.centerMapOnLocation(recenterData);
    }

    if (radioButtonValue === 'state') {
      console.log('build states select input');
      // TODO  - build state select input.
      // this.props.clearFilteredLocationsList();
    }
    if (radioButtonValue === 'nearme') {
      console.log('build nearme select input');
      // TODO - build nearme select input.
    }
  }

  // handleOnClick(e) {
  //   e.preventDefault();
  //   const recenterData = {
  //     lat: mapConfig.us.lat,
  //     lon: mapConfig.us.lon,
  //     zoom: mapConfig.us.zoom
  //   };
  //   this.props.centerMapOnLocation(recenterData);
  // }

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
            <label htmlFor="radio_us">US</label>
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
            <label htmlFor="radio_states">State</label>
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
        {/*<button onClick={this.handleOnClick.bind(this)}>Display US Map</button>*/}
      </div>
    )
  }

}

export default connect(null, {
  clearFilteredLocationsList,
  getAllLocationsFromCache,
  mapListedLocations
})(FilterRadioButtons);