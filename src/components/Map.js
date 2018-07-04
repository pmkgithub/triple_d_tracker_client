import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocations } from "../actions/locations";
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {

  componentDidMount() {
    this.props.fetchLocations();
  }

  logLocations() {
    console.log('logLocations this.props.mapData.locations', this.props.mapData.locations);
  }

  render() {
    {this.logLocations()}
    return (
      <div ref="map" />
    )
  }
}


// const mapStateToProps = (state) => {
//   return { locations: state.locations };
// };

const mapStateToProps = (state) => {
  return { mapData: state.locations };
};

export default connect(mapStateToProps, { fetchLocations })(Map);