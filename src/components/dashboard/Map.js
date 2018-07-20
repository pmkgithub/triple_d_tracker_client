import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
// import { MAP } from 'react-google-maps/lib/constants';
// import Modal from 'react-modal';
import LocationModal from './Modal';
import {
  fetchLocations,
  setMapLatLonCenter
} from "../../actions/action_locations";
import {
  setIsModalOpen,
  setLocationId
} from '../../actions/action_modal';
import "./map.css";
// import "./modal.css";

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      isInfoWindowOpen: false,
      markerId: null,
      // isModalOpen: false,
      // locationId: ''
    };

    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    // this.handleOnTabNavClick = this.handleOnTabNavClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.mapData.locationsBeenFetched) {
      this.props.fetchLocations();
    }
    // initialize isModalOpen here?
    // this.setState({isModalOpen: false})
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

  // markers - BEGIN
  handleOnClickMarker(markerObj, locationId) {
    //NOTE: markerObj supplied as first arg by react-google-maps.
    console.log('open detail modal with this id', locationId);
    // // old
    // this.setState({locationId});
    // this.openModal();
    // refact
    this.props.setIsModalOpen(true);
    this.props.setLocationId(locationId)
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

  // // Modal - BEGIN
  //
  // openModal() {
  //   this.setState({ isModalOpen: true});
  // }
  //
  // afterOpenModal() {
  //   // this.subtitle.style.color = '#f00';
  //   // this.red.style.color = '#f00';
  //   // this.green.style.color = '#f00';
  // }
  //
  // closeModal() {
  //   this.setState({isModalOpen: false});
  // }
  //
  // handleOnTabNavClick(e) {
  //   e.preventDefault();
  //   console.log('handleOnTabNavClick ran');
  // }

  // renderModal() {
  //   const location = this.props.mapData.cachedLocations.find((location) => {
  //     return location._id === this.state.locationId;
  //   });
  //   console.log('location = ', location);
  //   console.log('location.outOfBusiness = ', location.outOfBusiness);
  //
  //   return (
  //     <Modal
  //       isOpen={this.state.isModalOpen}
  //       onAfterOpen={this.afterOpenModal}
  //       //onRequestClose={this.closeModal} // closes modal when click outside modal.
  //       //style={customStyles}
  //       overlayClassName="overlay"
  //       className="modal"
  //       ariaHideApp={false} // disables aria
  //       // contentLabel="Example Modal" // for aria.
  //     >
  //       <div className="modal_button_close" onClick={this.closeModal}>X</div>
  //       {/*<h2 ref={red => this.red = red}>{location.outOfBusiness ?  location.name + ' (CLOSED)': location.name}</h2>*/}
  //       {/*<h2 className="modal_location_name">{location.outOfBusiness ?  location.name + ' (CLOSED)': location.name}</h2>*/}
  //
  //       <div className="modal_location_detail_wrapper">
  //         {location.outOfBusiness ? <h2 className="modal_location_name modal_location_out_biz">{location.name + ' (CLOSED)'}</h2>
  //           : <h1 className="modal_location_name modal_location_in_biz">{location.name}</h1>}
  //
  //         <div className="modal_location_info-wrapper">
  //           <div className="modal_location_addr">{location.addrFull}</div>
  //           <div className="modal_location_phone">{location.phone === 'none' ? 'No Phone Number' : 'Phone: ' + location.phone}</div>
  //           {location.url === 'none' ?
  //             <div>No URL Available</div> :
  //             <a
  //               className="modal_location_url"
  //               href={'//' + location.url}
  //               target="_blank"
  //             >{location.url}</a>
  //           }
  //         </div>
  //         <div className="modal_about_wrapper">
  //           <h3 className="modal_location_about">About:</h3>
  //           <p>{location.about}</p>
  //         </div>
  //         <div className="modal_add_review_button">Add Review</div>
  //       </div>
  //     </Modal>
  //     )
  // }
  // // Modal - END

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
          {this.props.isMarkerShown && <div>{this.renderMarkers()}</div>}
        </GoogleMap>
        {/*{this.state.isModalOpen &&  <div>{this.renderModal()}</div>}*/}
        <LocationModal />
      </div>


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
    setMapLatLonCenter,
    setIsModalOpen,
    setLocationId
  }),
  withGoogleMap
)(Map)

