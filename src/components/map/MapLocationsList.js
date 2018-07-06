import React, { Component }from 'react';
import { connect } from 'react-redux';

class MapLocationsList extends Component {

  render() {
    return (
      <div className="map-locations-list">List of Locations</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    displayedLocations: state.mapData.displayedLocations
  }
};

export default connect(mapStateToProps)(MapLocationsList);