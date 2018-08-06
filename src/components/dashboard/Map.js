import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { MAP } from 'react-google-maps/lib/constants';
import {
  fetchLocations,
  setMapLatLonCenter,
  setMapZoom,
  setLocationId
} from "../../actions/action_locations";
import {
  setIsModalOpen
} from '../../actions/action_modal';
import { fetchReviews } from '../../actions/action_reviews';
import "./map.css";


class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      isInfoWindowOpen: false,
      markerId: null,
    };
  }

  componentDidMount() {
    // Code here handles multiple AJAX calls.
    // First, fetchReviews, then fetchLocations.
    // Reason: on App load and Browser refresh, User reviews
    //         need to be in Redux so location maker's get colored properly.
    if (!this.props.mapData.locationsBeenFetched) {
      this.props.fetchReviews(localStorage.getItem("userId"))
        .then(() => {
          this.props.fetchLocations();
        })
    }
  }

  onMapLoad(map) {
    // Set GMA map instance to component's local state.
    // If map instance already set to local state, return.
    // Note: without this check, react throws an error.
    if (this.state.map !== null) {return}
    this.setState({map: map});
    // console.log('MAP', MAP);

  }

  // When map is panned by User, set the map center lat/lon.
  // Then later, if User clicks "Map All Listed Locations" button,
  // there will be a state change, and map re-centers properly.
  handleOnDragEnd(e) {
    const coordsString = JSON.stringify(this.state.map.getCenter());
    // NOTE: below, coords are Numbers.
    const coords = JSON.parse(coordsString);
    this.props.setMapLatLonCenter(coords);
  }

  // When map is zoomed by User, set the map's zoom.
  // Then later, if User clicks "Map All Listed Locations" button,
  // there will be a state change, and map re-centers properly.
  handleOnZoomChanged(e) {
    // NOTE: for whatever reason, handleOnZoomChanged() gets called
    //       when App initially loads.
    const zoom = this.state.map.getZoom();
    this.props.setMapZoom(zoom);
  }

  // markers - BEGIN
  handleOnClickMarker(markerObj, locationId) {
    //NOTE: markerObj supplied as first arg by react-google-maps, don't need it.
    this.props.setIsModalOpen(true);
    this.props.setLocationId(locationId);  // Needed by Modal's Location Detail.
  }

  mouseOverMarker(markerObj, markerId) {
    //NOTE: markerObj supplied as first arg by react-google-maps, don't need it.
    this.setState({isInfoWindowOpen: !this.state.isInfoWindowOpen, markerId});
  }

  mouseOutMarker() {
    this.setState({isInfoWindowOpen: !this.state.isInfoWindowOpen});
  }

  renderMarkers() {
    const { displayedMapLocations } = this.props.mapData;
    let markers;

    if ( this.props.mapData.isFetching ) {
      // console.log('data is loading');
      return false;
    }

    markers = displayedMapLocations.map((location, index) => {
      const {lat, lon} = location.coords;

      let iconUrl;
      const blueMarker = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
      const redMarker = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
      const greenMarker = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

      if (location.outOfBusiness === false && location.visited === false) {
        iconUrl = blueMarker;
      }

      if (location.outOfBusiness === false && location.visited === true ) {
        iconUrl = greenMarker;
      }

      if (location.outOfBusiness === true) {
        iconUrl = redMarker;
      }

      return (
        <Marker
          key={index}
          draggable={false}
          position={{ lat: lat, lng: lon }}
          onClick={(markerObj) => this.handleOnClickMarker(markerObj, location._id)}
          onMouseOver={(markerObj) => this.mouseOverMarker(markerObj, index, location.coords)}
          onMouseOut={(markerObj) => this.mouseOutMarker()}
          icon={{url: iconUrl}}
        >
          {this.state.isInfoWindowOpen && this.state.markerId === index && <InfoWindow
            key={index}
            // options={{disableAutoPan: true}}
            // onCloseClick={() => this.handleOnClickMarker()}
          ><div>{location.name}</div></InfoWindow>}
        </Marker>
      )
    });

    // If "Nearme" radio button selected, push User's Location Marker onto "markers" array.
    if ( this.props.selectedRadioButton === 'nearme' && this.props.usersNearmeData.lat ) {
      const distanceMeters = this.props.usersNearmeData.distanceMeters;
      const usersLat = this.props.usersNearmeData.lat;
      const usersLon = this.props.usersNearmeData.lon;
      const iconUrl = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';

      markers.push((
        <Marker
          key={distanceMeters}
          draggable={false}
          cursor={"default"}
          position={{ lat: usersLat, lng: usersLon }}
          onMouseOver={(markerObj) => this.mouseOverMarker(markerObj, distanceMeters)}
          onMouseOut={(markerObj) => this.mouseOutMarker()}
          icon={{url: iconUrl}}
        >
          {this.state.isInfoWindowOpen && this.state.markerId === distanceMeters && <InfoWindow
            key={distanceMeters}
          ><div>{"My Location"}</div></InfoWindow>}
        </Marker>)
      )
    }

    return markers;

  }
  // markers - END

  renderIsGeolocatingSpinner() {
    return (
      <div className="map_is_geolocating_spinner_wrapper">
        <div className="map_is_geolocating_spinner_message">Geolocating User's Location...</div>
        <div className="map_is_geolocating_spinner"><FontAwesomeIcon className="map_is_geolocating_spinner fa-spin" icon="spinner"/></div>
      </div>
    )
  }

  // Component's render()
  render() {

    return (
      <div>
        <GoogleMap
          // get reference to GM map instance.
          ref={(map) => this.onMapLoad(map)}
          zoom={this.props.mapData.mapZoom}
          center={{ lat: this.props.mapData.mapCenterLat, lng: this.props.mapData.mapCenterLon }}
          onDragEnd={(e) => this.handleOnDragEnd(e)}
          onZoomChanged={(e) => this.handleOnZoomChanged(e)}
        >
          {this.props.mapData.isGeolocating && this.renderIsGeolocatingSpinner()}
          {this.props.isMarkerShown && <div>{this.renderMarkers()}</div>}
        </GoogleMap>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mapData: state.mapData,
    selectedRadioButton: state.radioButton.selectedRadioButton,
    reviews: state.reviews,
    usersNearmeData: state.mapData.usersNearmeData
  };
};

// export without redux compose.
// export default connect(mapStateToProps, { fetchLocations })(withGoogleMap(Map));

export default compose (
  connect(mapStateToProps, {
    fetchLocations,
    fetchReviews,
    setMapLatLonCenter,
    setMapZoom,
    setIsModalOpen,
    setLocationId
  }),
  withGoogleMap
)(Map)

