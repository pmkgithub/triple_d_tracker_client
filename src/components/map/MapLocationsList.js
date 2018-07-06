import React, { Component }from 'react';
import { connect } from 'react-redux';
import { centerMapOnLocation } from '../../actions/locations';

class MapLocationsList extends Component {

  handleOnClick(event) {
    console.log('handleOnClick ran');
    const recenterData = {
      lat: parseFloat(event.target.getAttribute('data-lat')),
      lon: parseFloat(event.target.getAttribute('data-lon')),
      zoom: 14
    };
    this.props.centerMapOnLocation(recenterData);
  }

  renderList() {
    return this.props.displayedLocations.map((location, index) => {
      return (
        <li
          className="map-locations-li"
          key={index}
          onClick={this.handleOnClick.bind(this)}
          data-lat={location.coords.lat}
          data-lon={location.coords.lon}
        >
          {location.name}: {location.city}, {location.state}
        </li>
      )

    });
  }

  render() {
    return (
      <ul className="map-locations-ul">
        {this.renderList()}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    displayedLocations: state.mapData.displayedLocations
  }
};

export default connect(mapStateToProps, { centerMapOnLocation } )(MapLocationsList);