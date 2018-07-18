import React, { Component }from 'react';
import { connect } from 'react-redux';
import {
  mapSingleLocationFromList,
  mapAllLocationsFromList
} from '../../actions/action_locations';
// import mapConfig from '../../configs/mapConfig';
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

  // TODO - refact for SET_LAT_LON_ZOOM_FOR_UI_LIST
  // click on Map All Locations From List <button>.
  handleOnClickButton(e) {
    // Note: Will resit the map to US, selected US State, or selected Near Me.
    //       props.geoCenter
    e.preventDefault();

    // TODO - refact for SET_LAT_LON_ZOOM_FOR_UI_LIST code for deletion.
    //
    // if (this.props.selectedRadioButton === 'US') {
    //   // recenter/zoom to US lat/lon/zoom.
    //
    // }
    //
    // if (this.props.selectedRadioButton === 'nearme') {
    //   // recenter/zoom map on nearme's lat/lon/zoom.
    // } else {
    //   // recenter/zoom map to US State's lat/lon/zoom.
    // }

    // TODO - refact for SET_LAT_LON_ZOOM_FOR_UI_LIST
    // b/f refact.
    // this.props.mapAllLocationsFromList(this.props.mapGeoCenter);
    console.log('FilterLocationsList.js this.props.uiListRecenterCoords = ', this.props.uiListRecenterCoords);
    this.props.mapAllLocationsFromList(this.props.uiListRecenterCoords);
  }

  renderList() {
    return this.props.filteredListLocations.map((location, index) => {
      return (
        <li
          className="filtered_locations_li"
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
    // b/f refact
    // TODO - refact for SET_LAT_LON_ZOOM_FOR_UI_LIST code for deletion.
    // mapGeoCenter: state.mapData.mapGeoCenter,
    uiListRecenterCoords: state.mapData.uiListRecenterCoords,
    selectedRadioButton: state.radioButton.selectedRadioButton
  }
};

export default connect(mapStateToProps,
  {
    mapSingleLocationFromList,
    mapAllLocationsFromList
  })(FilteredLocationsList);