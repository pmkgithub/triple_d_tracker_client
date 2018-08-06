import React from 'react';
import Header from './Header';
// Font Awesome
import { library as faLibrary} from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // do this in Component
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
faLibrary.add(faCheck, faSpinner);
// Font Awesome

export default ({children}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};