import React from 'react';
import Header from './Header';
// Font Awesome
import { library as faLibrary} from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // do t.his in Component
import { faCheck } from '@fortawesome/free-solid-svg-icons';
faLibrary.add(faCheck);
// Font Awesome

export default ({children}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};