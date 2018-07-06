import React, { Component }from 'react';
import { connect } from 'react-redux';

class MapLocationsList extends Component {

  renderList() {
    return this.props.displayedLocations.map((location, index) => {
      console.log('location =', location);
      return (
        <li
          className="map-locations-li"
          key={index}
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

export default connect(mapStateToProps)(MapLocationsList);