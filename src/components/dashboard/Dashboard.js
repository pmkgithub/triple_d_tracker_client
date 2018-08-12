import React, {Component}from 'react';
import Map from './Map';
import Modal from '../modal/Modal';
import FilterRadioButton from './FilterRadioButtons';
import FilterSelectInput from './FilterSelectInput';
import FileterdLocationsList from './FilteredLocationsList';
import requireAuth from '../requireAuth';
import './dashboard.css';

// // TODO - orig - refact-layout - BEGIN
// export default (props) => {
//   return (
//     <div>
//       <h3>Welcome! Sign Up or Sign In!  This is the Landing Page</h3>
//       <div className="dashboard_wrapper">
//         <Map
//           containerElement={<div className="map_wrapper" />}
//           mapElement={<div className="map_element" />}
//           isMarkerShown >
//         </Map>
//         <Modal/>
//         <div className="map_filters_location_list_wrapper">
//           <div className="map_filters_wrapper">
//             <FilterRadioButton/>
//             <FilterSelectInput/>
//           </div>
//           <div className="map_locations_list_wrapper">
//             <div className="map_locations_list_header">Diners, Drive-ins & Dives Locations:</div>
//             <FileterdLocationsList/>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
// // TODO - orig - refact-layout - END

// TODO - refact - refact-layout - BEGIN
class Dashboard extends Component {

  render() {
    console.log('Dashboord render ran...');
    return (
      <div>
        <h3>Dashboard</h3>
        <div className="dashboard_wrapper">
          <Map
            containerElement={<div className="map_wrapper" />}
            mapElement={<div className="map_element" />}
            isMarkerShown >
          </Map>
          <Modal/>
          <div className="map_filters_location_list_wrapper">
            <div className="map_filters_wrapper">
              <FilterRadioButton/>
              <FilterSelectInput/>
            </div>
            <div className="map_locations_list_wrapper">
              <div className="map_locations_list_header">Diners, Drive-ins & Dives Locations:</div>
              <FileterdLocationsList/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// export default Dashboard;
export default requireAuth(Dashboard);
// TODO - refact - refact-layout - END