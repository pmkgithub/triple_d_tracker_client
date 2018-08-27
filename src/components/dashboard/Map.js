import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { GoogleMap, Marker, InfoWindow, Circle, withGoogleMap } from 'react-google-maps';
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
import radioButtonConfig from '../../configs/radioButtonConfig';
import mapConfig from '../../configs/mapConfig';
import mapSelectInputConfig from "../../configs/mapSelectInputConfig";
import "./map.css";

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      isInfoWindowOpen: false,
      markerId: null,
    };

    this.setScreenResizeZoom = this.setScreenResizeZoom.bind(this);

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

    window.addEventListener('resize', this.setScreenResizeZoom);
    this.setScreenResizeZoom(); // for initial map load.
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setScreenResizeZoom);
  }

  onMapLoad(map) {
    // Set GMA map instance to component's local state.
    // NOTE: this map instance is NOT a true GMA map instance, but rather a
    //       react-google-map version of the GMA map instance.
    //       Thus, not all of GMA's map instance methods are present on the
    //       react-google-map version of the GMA map instance.
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

  setScreenResizeZoom() {

    if ( this.props.selectedRadioButton === radioButtonConfig.us ||
         this.props.selectedRadioButton === radioButtonConfig.visited )
    {
      if(window.innerWidth <= 1260 ) {
        // set mobile zoom.
        this.props.setMapZoom(3);
      } else {
        // full screen zoom
        this.props.setMapZoom(4);
      }
    }

    if(this.props.selectedRadioButton === radioButtonConfig.state) {

      // Handles if/when user might resize screen without first selecting
      // a US State from Select Input.
      if(!this.props.mapData.usStateAbbr) {return}

      let usStateZoom = mapConfig[this.props.mapData.usStateAbbr].zoom;
      if(window.innerWidth <= 1260 ) {
        // set mobile zoom.
        this.props.setMapZoom(usStateZoom - 1);
      } else {
        // full screen zoom
        this.props.setMapZoom(usStateZoom);
      }
    }

    if(this.props.selectedRadioButton === radioButtonConfig.nearme) {

      // Handles if/when user might resize screen without first selecting
      // a Near Me Distance from Select Input.
      if(!this.props.mapData.nearMeDistance) {
        if(window.innerWidth <= 1260 ) {
          // set mobile zoom.
          this.props.setMapZoom(3);
        } else {
          // full screen zoom
          this.props.setMapZoom(4);
        }
        return;
      }

      let nearMeZoom = mapSelectInputConfig.nearmeZoom[this.props.mapData.nearMeDistance];
      if(window.innerWidth <= 1260 ) {
        // set mobile zoom.
        this.props.setMapZoom(nearMeZoom - 1);
      } else {
        // full screen zoom
        this.props.setMapZoom(nearMeZoom);
      }
    }

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

    // Return early if data is being fetched.
    if ( this.props.mapData.isFetching ) { return false; }

    markers = displayedMapLocations.map((location, index) => {
      const {lat, lon} = location.coords;

      let redMarkerZIndex;

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
        redMarkerZIndex =  index - index -1;  // set red marker z-index to -1
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
          zIndex={ iconUrl === redMarker ? redMarkerZIndex : '' }
        >
          {this.state.isInfoWindowOpen && this.state.markerId === index && <InfoWindow
            key={index}
            options={{disableAutoPan: true}}
            // onCloseClick={() => this.handleOnClickMarker()}
          ><div>{location.name}</div></InfoWindow>}
        </Marker>
      )
    });

    // If "Nearme" radio button selected, push User's Location Marker onto "markers" array.
    if ( this.props.selectedRadioButton === 'nearme' && this.props.usersNearmeData.lat ) {
      const distanceMeters = this.props.usersNearmeData.distanceMeters; // just using this as the key, no other functionality.
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
          zIndex={10000}
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

  renderGeolocatingSpinner() {
    let wrapperClass = `map_is_geolocating_spinner_wrapper`;
    this.props.mapData.isGeolocating ? wrapperClass = wrapperClass + ' visible'
      : wrapperClass = wrapperClass + ' hidden';
    return (
      <div className={wrapperClass}>
        <div className="map_is_geolocating_spinner_message">Finding Near Me Locations</div>
        <div className="map_is_geolocating_spinner"><FontAwesomeIcon className="map_is_geolocating_spinner fa-spin" icon="spinner"/></div>
      </div>
    )
  }

  renderMapLegend() {
    const greenMarker = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    const blueMarker = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    const redMarker = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    const yellowMarker = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
    return (
      <div className="map_legend_wrapper">
        <div className="map_legend_header">Map Legend</div>
        <div className="map_legend_row">
          <img className="map_legend_icon" src={greenMarker} alt=""/>
          <div className="map_legend_icon_desc">Visited Location</div>
        </div>
        <div className="map_legend_row">
          <img className="map_legend_icon" src={blueMarker} alt=""/>
          <div className="map_legend_icon_desc">Not Visited Location</div>
        </div>
        <div className="map_legend_row">
          <img className="map_legend_icon" src={redMarker} alt=""/>
          <div className="map_legend_icon_desc">Out of Business</div>
        </div>
        <div className="map_legend_row">
          <img className="map_legend_icon" src={yellowMarker} alt=""/>
          <div className="map_legend_icon_desc">My Near Me Location</div>
        </div>
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
          {!this.props.mapData.isGeolocating &&
          this.props.selectedRadioButton === 'nearme' &&
          this.props.usersNearmeData.lat &&
          <Circle
            center={{lat: this.props.usersNearmeData.lat, lng: this.props.usersNearmeData.lon }}
            radius={this.props.usersNearmeData.distanceMeters}
            options={{
              // strokeColor: '#FFFF00', // yellow.
              strokeColor: '#3366FF', // blue.
              strokeWeight: 2,
              fillColor: '',
              fillOpacity: 0.0
            }}
          />
          }
          {this.props.isMarkerShown && <div>{this.renderMarkers()}</div>}
        </GoogleMap>
        {this.renderGeolocatingSpinner()}
        {this.renderMapLegend()}
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
)(Map);

