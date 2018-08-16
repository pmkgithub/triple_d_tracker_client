import React, { Component } from 'react';
import image from '../images/corks01_john_murzaku_269690_unsplash.jpg';
import './BackgroundImage01.css'

// // WAY 1 -
// class BackgroundImage01 extends Component {
//   render() {
//     return (
//       <div
//         className="bg-overlay"
//       >
//         {/*<img className="bg01" src={image} alt=""/>*/}
//       </div>
//     )
//   }
//
// }

// WAY 2 - with blackout effect.
const divStyle = {
  backgroundImage: `url(${image})`
};

class BackgroundImage01 extends Component {

  render() {
    return (
      <div
        className="bg01"
        style={divStyle}
      >
      </div>
    )
  }

}


export default BackgroundImage01;