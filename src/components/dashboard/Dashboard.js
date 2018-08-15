import React, {Component}from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Map from './Map';
import Modal from '../modal/Modal';
import FilterRadioButton from './FilterRadioButtons';
import FilterSelectInput from './FilterSelectInput';
import FileterdLocationsList from './FilteredLocationsList';
import { setCurrentRoute } from '../../actions/action_currentRoute';
import requireAuth from '../requireAuth';
import './dashboard.css';

class Dashboard extends Component {

  componentWillMount() {
    this.props.setCurrentRoute(window.location.pathname);  // for Nav.js links logic.
  }

  render() {
    return (
      <div>
        <div className="dashboard_wrapper">
          <Map
            containerElement={<div className="map_wrapper" />}
            mapElement={<div className="map_element" />}
            isMarkerShown >
          </Map>
          <Modal/>
          <div className="map_filters_location_list_wrapper">
            <div className="map_filters_wrapper">
              <FilterRadioButton/>
              <FilterSelectInput/>
            </div>
            <div className="map_locations_list_wrapper">
              <div className="map_locations_list_header">Diners, Drive-ins & Dives Locations:</div>
              <FileterdLocationsList/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  connect(null, { setCurrentRoute }),
  requireAuth
)(Dashboard);
