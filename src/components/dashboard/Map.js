import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
// import { MAP } from 'react-google-maps/lib/constants';
import {
  fetchLocations,
  setMapLatLonCenter,
  setLocationId
} from "../../actions/action_locations";
import {
  setIsModalOpen
} from '../../actions/action_modal';
// TODO - SET_RERENDER_MAP_BOOL -> delete if not needed.
import { fetchReviews, setRerenderMapBool } from '../../actions/action_reviews';
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

  // markers - BEGIN
  handleOnClickMarker(markerObj, locationId) {
    //NOTE: markerObj supplied as first arg by react-google-maps, don't need it.
    // console.log('Clicked Marker location id', locationId);
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

    if ( this.props.mapData.isFetching ) {
      // console.log('data is loading');
      return false;
    }

    return displayedMapLocations.map((location, index) => {
      // console.log('Map.js renderMarkers location = ',location);
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
    })

  }
  // markers - END

  // Component's render()
  render() {

    // // TODO - SET_RERENDER_MAP_BOOL -> delete if not needed.
    // // console.log('this.props = ', this.props);
    // // if ( !this.props.reviews.rerenderMapBool ) { return false }
    // if ( this.props.reviews.rerenderMapBool ) {
    //   console.log('Map.js called setRerenderMapBool');
    //   this.forceUpdate();
    //   this.props.setRerenderMapBool(false);
    // }

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
          {this.props.isMarkerShown && <div>{this.renderMarkers()}</div>}
        </GoogleMap>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mapData: state.mapData,
    reviews: state.reviews
  };
};

// export without redux compose.
// export default connect(mapStateToProps, { fetchLocations })(withGoogleMap(Map));

export default compose (
  connect(mapStateToProps, {
    fetchLocations,
    fetchReviews,
    setMapLatLonCenter,
    setIsModalOpen,
    setLocationId,
    // TODO - SET_RERENDER_MAP_BOOL -> delete if not needed.
    setRerenderMapBool
  }),
  withGoogleMap
)(Map)

