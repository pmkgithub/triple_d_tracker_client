import React, { Component }from 'react';
import { connect } from 'react-redux';
import {
  mapSingleLocationFromList,
  mapAllLocationsFromList
} from '../../actions/action_locations';
import './filtered_locations_list.css';

class FilteredLocationsList extends Component {

  // click on list item.
  handleOnClick(event, location) {
    event.preventDefault();

    const recenterData = {
      name: location.name,
      lat: parseFloat(location.coords.lat),
      lon: parseFloat(location.coords.lon),
      zoom: 14
    };
    this.props.mapSingleLocationFromList(recenterData);
  }

  // click on Map All Locations From List <button>.
  handleOnClickButton(e) {
    e.preventDefault();
    this.props.mapAllLocationsFromList(this.props.mapGeoCenter);
  }

  renderList() {
    return this.props.filteredListLocations.map((location, index) => {
      return (
        <li
          className="filtered_locations_li"
          key={index}
          onClick={(event) => this.handleOnClick(event, location)}
        >
          {location.name}: {location.city}, {location.state}
        </li>
      )

    });
  }

  render() {
    return (
      <div>
        <button
          className="filtered_locations_button"
          onClick={(e) => {this.handleOnClickButton(e)}}
        >Map All Listed Locations
        </button>
        <ul
          className="filtered_locations_ul">
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filteredListLocations: state.mapData.filteredListLocations,
    mapGeoCenter: state.mapData.mapGeoCenter
  }
};

export default connect(mapStateToProps,
  {
    mapSingleLocationFromList,
    mapAllLocationsFromList
  })(FilteredLocationsList);