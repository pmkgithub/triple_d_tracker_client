import React from 'react';
import Header from './Header';
import { library as faLibrary} from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';

faLibrary.add(faCheck);

export default ({children}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};