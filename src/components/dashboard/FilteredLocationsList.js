import React, { Component }from 'react';
import { connect } from 'react-redux';
import {
  mapSingleLocationFromList,
  mapAllLocationsFromList
} from '../../actions/action_locations';
import './filtered_locations_list.css';

class FilteredLocationsList extends Component {

  // click on list item.
  handleOnClickListItem(event, location) {
    event.preventDefault();

    // Lat / Lon is the Single Location's lat/ lon.
    // Zoom will be the same for all Single Location markers.
    const singleLocationData = {
      name: location.name,
      lat: parseFloat(location.coords.lat),
      lon: parseFloat(location.coords.lon),
      zoom: 14
    };
    this.props.mapSingleLocationFromList(singleLocationData);
  }

  handleOnClickButton(e) {
    // Note: Clicking on Map All Locations From List button will:
    //       will redisplay all markers for the UI List Locations.
    //       for US List, selected US State List, or selected Near Me List.
    e.preventDefault();
    this.props.mapAllLocationsFromList(this.props.uiListRecenterCoords);
  }

  renderList() {
    return this.props.filteredListLocations.map((location, index) => {

      let className;
      index % 2 === 1 ? className = "filtered_locations_li even" : className = "filtered_locations_li odd";
      location.outOfBusiness ? className = className + ' closed' : '';

      return (
        <li
          className={className}
          key={index}
          onClick={(event) => this.handleOnClickListItem(event, location)}
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
        <hr></hr>
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
    uiListRecenterCoords: state.mapData.uiListRecenterCoords,
    selectedRadioButton: state.radioButton.selectedRadioButton
  }
};

export default connect(mapStateToProps,
  {
    mapSingleLocationFromList,
    mapAllLocationsFromList
  })(FilteredLocationsList);