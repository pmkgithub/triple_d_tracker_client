import React from 'react';
import Nav from './Nav';
// Font Awesome - BEGIN
import { library as faLibrary} from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // do this in Component
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
faLibrary.add(faCheck, faSpinner);
// Font Awesome - END

export default ({children}) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};