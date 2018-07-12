import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { fetchLocations } from "../../actions/action_locations";
import "./map.css";

class Map extends Component {

  componentDidMount() {
    if (!this.props.mapData.locationsBeenFetched) {
      this.props.fetchLocations();
    }
  }

  renderMarkers() {
    const { displayedMapLocations } = this.props.mapData;

    if ( this.props.mapData.isFetching ) {
      // console.log('data is loading');
      return false;  // temporary code...
    }

    return displayedMapLocations.map((location, index) => {
      const {lat, lon} = location.coords;
      return (
        <Marker
          key={index}
          position={{ lat: lat, lng: lon }}
        />
      )
    })
  }

  render() {
    return (
      <GoogleMap
        // defaultZoom={this.props.mapData.mapZoom}
        zoom={this.props.mapData.mapZoom}
        // defaultCenter={{ lat: this.props.mapData.mapCenterLat, lng: this.props.mapData.mapCenterLon }}
        center={{ lat: this.props.mapData.mapCenterLat, lng: this.props.mapData.mapCenterLon }}

      >
        {this.props.isMarkerShown && <div>{this.renderMarkers()}</div>}
      </GoogleMap>
    )
  }
}

const mapStateToProps = (state) => {
  return { mapData: state.mapData };
};

// export without redux compose.
// export default connect(mapStateToProps, { fetchLocations })(withGoogleMap(Map));

export default compose (
  connect(mapStateToProps, { fetchLocations }),
  withGoogleMap
)(Map)

