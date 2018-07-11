import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  clearFilteredLocationsList,
  getAllLocationsFromCache,
  mapListedLocations
} from '../../actions/action_locations';
import { setMapSelectInputType } from '../../actions/action_map_select_input';
import mapConfig from '../../configs/mapConfig';
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
      console.log('FilterRadioButton call setMapSelectInputType with ', radioButtonValue);

      // TODO - build us select input.
      this.props.setMapSelectInputType(radioButtonValue);

      // this.props.getAllLocationsFromCache();
      this.props.mapListedLocations();

      // const recenterData = {
      //   lat: mapConfig.us.lat,
      //   lon: mapConfig.us.lon,
      //   zoom: mapConfig.us.zoom
      // };
      // this.props.centerMapOnLocation(recenterData);
    }

    if (radioButtonValue === mapSelectInputConfig.state) {
      console.log('FilterRadioButton call setMapSelectInputType with ', radioButtonValue);
      // TODO  - build state select input.
      this.props.setMapSelectInputType(radioButtonValue);
      // this.props.clearFilteredLocationsList();
    }
    if (radioButtonValue === mapSelectInputConfig.nearme) {
      console.log('FilterRadioButton call setMapSelectInputType with ', radioButtonValue);
      // TODO - build nearme select input.
      this.props.setMapSelectInputType(radioButtonValue);
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
  mapListedLocations,
  setMapSelectInputType
})(FilterRadioButtons);