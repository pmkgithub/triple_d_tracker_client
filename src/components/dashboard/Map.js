import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
// import { MAP } from 'react-google-maps/lib/constants';
import {
  fetchLocations,
  setMapLatLonCenter
} from "../../actions/action_locations";
import "./map.css";

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      isInfoWindowOpen: false,
      markerId: null
    }
  }

  componentDidMount() {
    if (!this.props.mapData.locationsBeenFetched) {
      this.props.fetchLocations();
    }
  }

  onMapLoad(map) {
    // Set GMA map instance to component's local state.
    // If map instance already set to local state, return.
    // Note: without this check, react errors out.
    if (this.state.map !== null) {return}
    this.setState({map: map});
    // console.log('MAP', MAP);

  }

  // When map is panned by User, reset the map center lat/lon.
  // This keeps map from "jumping" when marker's are hovered.
  handleOnDragEnd(e) {
    const coordsString = JSON.stringify(this.state.map.getCenter());
    const coords = JSON.parse(coordsString);
    this.props.setMapLatLonCenter(coords);
  }

  // When map is zoomed by User, reset the map center lat/lon.
  // This keeps map from "jumping" when marker's are hovered.
  handleOnZoomChanged(e) {
    const coordsString = JSON.stringify(this.state.map.getCenter());
    const coords = JSON.parse(coordsString);
    this.props.setMapLatLonCenter(coords);
  }

  handleOnClickMarker(markerObj, mongoId) {
    //NOTE: markerObj supplied as first arg by react-google-maps.
    console.log('open detail modal with this id', mongoId);
  }

  mouseOverMarker(markerObj, markerId) {
    //NOTE: markerObj supplied as first arg by react-google-maps.
    this.setState({isInfoWindowOpen: !this.state.isInfoWindowOpen, markerId});
  }

  mouseOutMarker() {
    this.setState({isInfoWindowOpen: !this.state.isInfoWindowOpen});
  }

  renderMarkers() {
    const { displayedMapLocations } = this.props.mapData;

    if ( this.props.mapData.isFetching ) {
      // console.log('data is loading');
      return false;  // temporary code...
    }

    // // original code.
    // return displayedMapLocations.map((location, index) => {
    //   const {lat, lon} = location.coords;
    //   return (
    //       <Marker
    //         key={index}
    //         position={{ lat: lat, lng: lon }}
    //         onClick={(e) => this.handleOnClickMarker(e)}
    //       />
    //   )
    // })

    return displayedMapLocations.map((location, index) => {
      // console.log('Map.js renderMarkers location = ',location);
      const {lat, lon} = location.coords;
      return (
          <Marker
            key={index}
            position={{ lat: lat, lng: lon }}
            onClick={(markerObj) => this.handleOnClickMarker(markerObj, location._id)}
            onMouseOver={(markerObj) => this.mouseOverMarker(markerObj, index, location.coords)}
            onMouseOut={(markerObj) => this.mouseOutMarker()}
            icon={{strokeColor: "blue"}}
          >
            {this.state.isInfoWindowOpen && this.state.markerId === index && <InfoWindow
              key={index}
              options={{disableAutoPan: true}}
              // onCloseClick={() => this.handleOnClickMarker()}
            ><div>{location.name}</div></InfoWindow>}
          </Marker>
      )
    })

  }

  render() {
    return (
      <GoogleMap
        // get reference to GM map instance.
        ref={(map) => this.onMapLoad(map)}
        // defaultZoom={this.props.mapData.mapZoom}
        zoom={this.props.mapData.mapZoom}
        // defaultCenter={{ lat: this.props.mapData.mapCenterLat, lng: this.props.mapData.mapCenterLon }}
        center={{ lat: this.props.mapData.mapCenterLat, lng: this.props.mapData.mapCenterLon }}
        onDragEnd={(e) => this.handleOnDragEnd(e)}
        onZoomChanged={(e) => this.handleOnZoomChanged(e)}

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
  connect(mapStateToProps, {
    fetchLocations,
    setMapLatLonCenter
  }),
  withGoogleMap
)(Map)

