import React, {Component}from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Map from './Map';
import Modal from '../modal/Modal';
import FilterRadioButtons from './FilterRadioButtons';
import FilterSelectInput from './FilterSelectInput';
import FilteredLocationsList from './FilteredLocationsList';
import { setCurrentRoute } from '../../actions/action_currentRoute';
import requireAuth from '../requireAuth';
import './dashboard.css';

export class Dashboard extends Component {

  componentWillMount() {
    this.props.setCurrentRoute(window.location.pathname);  // for Nav.js links logic.
  }

  render() {
    return (
      <div className="dashboard_wrapper">
        <div className="dashboard_title">Dashboard</div>

        <div className="dashboard_map_filters_location_list_wrapper">
          <div className="dashboard_map_wrapper">
            <Map
              containerElement={<div className="map_container_element" />}
              mapElement={<div className="map_element" />}
              isMarkerShown >
            </Map>
          </div>

          <Modal/>
          <div className="filters_location_list_wrapper">
            <div className="filters_wrapper">
              <FilterRadioButtons/>
              <FilterSelectInput/>
            </div>
            <div className="filtered_locations_list_wrapper">
              <div className="filtered_locations_list_header">Diners, Drive-ins & Dives Locations:</div>
              <FilteredLocationsList/>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default compose(
  connect(null, { setCurrentRoute }),
  // requireAuth
)(Dashboard);