import React, { Component }from 'react';
import { connect } from 'react-redux';
import {
  mapSingleLocationFromList,
  mapAllLocationsFromList
} from '../../actions/action_locations';
import './filtered_locations_list.css';

class FilteredLocationsList extends Component {

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

  handleOnClickButton(e) {
    e.preventDefault();
    this.props.mapAllLocationsFromList();
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
        {/*<button className="filtered_locations_button" onClick={this.handleOnClickButton.bind(this)}>Map All Listed Items</button>*/}
        <button
          className="filtered_locations_button"
          onClick={(e) => {this.handleOnClickButton(e)}}
        >Map All Listed Items
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
    filteredListLocations: state.mapData.filteredListLocations
  }
};

export default connect(mapStateToProps,
  {
    mapSingleLocationFromList,
    mapAllLocationsFromList
  })(FilteredLocationsList);