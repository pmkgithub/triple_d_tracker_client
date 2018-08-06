import React, { Component }from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    e.preventDefault();
    // Note: Clicking on "Map All Listed Locations" button will
    //       redisplay all markers found in the UI Locations List.
    this.props.mapAllLocationsFromList();
  }

  renderList() {
    return this.props.filteredLocationsList.map((location, index) => {

      let className;
      index % 2 === 1 ? className = "filtered_locations_li even" : className = "filtered_locations_li odd";
      location.outOfBusiness ? className = className + ' closed' : '';
      location.visited ? className = className + ' visited' : '';

      return (
        <li
          className={className}
          key={index}
          onClick={(event) => this.handleOnClickListItem(event, location)}
        >
          {location.name}: {location.city}, {location.state}
          {location.visited
            ? <FontAwesomeIcon className="icon_check" icon="check"/>
            : ''
          }
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
    filteredLocationsList: state.mapData.filteredLocationsList,
    selectedRadioButton: state.radioButton.selectedRadioButton
  }
};

export default connect(mapStateToProps,
  {
    mapSingleLocationFromList,
    mapAllLocationsFromList
  })(FilteredLocationsList);