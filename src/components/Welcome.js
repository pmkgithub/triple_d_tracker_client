import React from 'react';
import Map from './map/Map';

export default (props) => {
  return (
    <div>
      <h3>Welcome! Sign Up or Sign In!  This is the Landing Page</h3>
      <Map
        containerElement={<div className="containerElement" style={{height: 600+'px', width: 700+'px'}} />}
        mapElement={<div className="mapElement" style={{height: 600+'px', width: 700+'px'}} />}
        isMarkerShown
        >
      </Map>
    </div>
  )
}