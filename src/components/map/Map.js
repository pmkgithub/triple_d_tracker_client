import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchLocations } from "../../actions/locations";
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {

  componentDidMount() {
    this.props.fetchLocations();
  }

  renderMarkers() {
    const { locations } = this.props.mapData;
    if ( this.props.mapData.isFetching ) {
      console.log('data is loading');
      return false;  // temporary code...

    }

    return locations.map((location, index) => {

      const lat = location.coords.lat;
      const lng = location.coords.lon;

      return (
        <Marker
          key={index}
          position={{ lat: lat, lng: lng }}
        />
      )
    })
  }

  render() {

    return (
      <GoogleMap
        defaultZoom={4.5}
        defaultCenter={{ lat: 39.8283, lng: -98.5795 }}
      >
        {this.props.isMarkerShown && <div>{this.renderMarkers()}</div>
        }
      </GoogleMap>
    )
  }
}


// const mapStateToProps = (state) => {
//   return { locations: state.locations };
// };

const mapStateToProps = (state) => {
  return { mapData: state.mapData };
};

// export without redux compose.
// export default connect(mapStateToProps, { fetchLocations })(withGoogleMap(Map));

export default compose (
  connect(mapStateToProps, { fetchLocations }),
  withGoogleMap
)(Map)

