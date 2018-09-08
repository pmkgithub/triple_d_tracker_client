import React, { Component }from 'react';
import { connect } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // mapSingleLocationFromList,
  // mapAllLocationsFromList,
  // clearLocationsFromList,
  // createUsLocationsList
} from '../../actions/action_locations';
// import { setSelectedRadioButton } from '../../actions/action_radio_button';
import './filtered_locations_list.css';

class FilteredLocationsList extends Component {

  // componentWillMount() {
  //
  //   // When User navigates from /about to /dashboard, change Locations List, Map, Radio Button
  //   // and SelectInput value back to US:
  //   // 1) the Filter By radio button will go back to USA
  //   //    (via the FilterRadioButtons.js component's local state).
  //   // 2) the FilterSelectInput changes back to "Not Applicable for Filter By: USA"
  //   //    via this.props.setSelectedRadioButton('us') below, and FilterSelectInput render() logic.
  //   // 3) The this.props.clearLocationsFromList() and this.props.createUsLocationsList below
  //   //    makes the Locations List display all of the US Locations.
  //   if (this.props.selectedRadioButton !== 'us') {
  //     this.props.setSelectedRadioButton('us');
  //     this.props.clearLocationsFromList();
  //     this.props.createUsLocationsList();
  //   }
  // }

  // // click on list item.
  // handleOnClickListItem(event, location) {
  //   event.preventDefault();
  //
  //   // Lat / Lon is the Single Location's lat/ lon.
  //   // Zoom will be the same for all Single Location markers.
  //   const singleLocationData = {
  //     name: location.name,
  //     lat: parseFloat(location.coords.lat),
  //     lon: parseFloat(location.coords.lon),
  //     zoom: 14
  //   };
  //   this.props.mapSingleLocationFromList(singleLocationData);
  // }

  // handleOnClickButton(e) {
  //   e.preventDefault();
  //   // Note: Clicking on "Map All Listed Locations" button will
  //   //       redisplay all markers found in the UI Locations List.
  //   this.props.mapAllLocationsFromList();
  // }

  // renderList() {
  //
  //   return this.props.filteredLocationsList.map((location, index) => {
  //
  //     // Create the className for the <li>.
  //     let className;
  //     index % 2 === 1 ? className = "filtered_locations_li even" : className = "filtered_locations_li odd";
  //     if(location.outOfBusiness) { className = className + ' closed' }
  //     if(location.visited) { className = className + ' visited' }
  //     // Note: ternary creates a compile error in console.
  //     // location.outOfBusiness ? className = className + ' closed' : '';
  //     // location.visited ? className = className + ' visited' : '';
  //
  //     return (
  //       <li
  //         className={className}
  //         key={index}
  //         onClick={(event) => this.handleOnClickListItem(event, location)}
  //       >
  //         {location.name}: {location.city}, {location.state}
  //         {location.visited
  //           ? <FontAwesomeIcon className="icon_check" icon="check"/>
  //           : ''
  //         }
  //       </li>
  //     )
  //
  //   });
  // }

  render() {
    return (
      <div>
        <button
          className="filtered_locations_button"
          // onClick={(e) => {this.handleOnClickButton(e)}}
        >Map All Listed Locations
        </button>
        <hr></hr>
        <ul
          className="filtered_locations_ul">
          {/*{this.renderList()}*/}
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
    mapAllLocationsFromList,
    setSelectedRadioButton,
    clearLocationsFromList,
    createUsLocationsList
  })(FilteredLocationsList);


// import React from 'react';
//
// export const FilteredLocationsList = (props) => {
//   return (
//     <div>My List</div>
//   )
// };