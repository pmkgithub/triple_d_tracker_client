import React from 'react';
import Map from './map/Map';
import MapFilters from './map/MapFilters';
import MapSelectInput from './map/MapSelectInput';
import MapLocationsList from './map/MapLocationsList';
import '../components/map/map.css';

export default (props) => {
  return (
    <div>
      <h3>Welcome! Sign Up or Sign In!  This is the Landing Page</h3>
      <div className="map-and-map-filter-wrapper">
        <Map
          containerElement={<div className="map-wrapper" />}
          mapElement={<div className="map-element" />}
          isMarkerShown >
        </Map>
        <div className="map-filter-wrapper">
          <MapFilters/>
          <MapSelectInput/>
          <div className="map-locations-list-wrapper">
            <div className="map-locations-list-header">Tripple D Locations</div>
            <MapLocationsList/>
          </div>
        </div>
      </div>
    </div>
  )
}