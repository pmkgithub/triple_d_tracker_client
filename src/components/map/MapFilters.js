import React, { Component } from 'react';
import { connect } from 'react-redux';
import { centerMapOnLocation } from '../../actions/locations';
import mapConfig from '../../map_config/mapConfig';

class MapFilters extends Component {

  handleOnClick(e) {
    e.preventDefault();
    const recenterData = {
      lat: mapConfig.us.lat,
      lon: mapConfig.us.lon,
      zoom: mapConfig.us.zoom
    };
    this.props.centerMapOnLocation(recenterData);
  }

  render()  {
    return (
      <div>Map Filters
        <button onClick={this.handleOnClick.bind(this)}>Display US Map</button>
      </div>
    )
  }

}

export default connect(null, { centerMapOnLocation })(MapFilters);