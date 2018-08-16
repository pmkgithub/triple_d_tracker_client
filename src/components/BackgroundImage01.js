import React, { Component } from 'react';
// import image from '../images/fre-sonneveld-315-unsplash.jpg';
// import image from '../images/adrian-502592-unsplash.jpg';
import image from '../images/r-mac-wheeler-650214-unsplash.jpg';
import './BackgroundImage01.css'

// // WAY 1 - not successful getting overlay blackening effect to work.
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

// WAY 2 - with blackening tone effect.
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