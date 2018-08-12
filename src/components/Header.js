import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import About from './About';
import './header.css';

// // TODO - orig - refact-layout BEGIN
// class Header extends Component {
//
//   renderLinks() {
//     if (this.props.authenticated) {
//       return (
//         <div>
//           <Link to="/signout" component="">Sign Out</Link>
//           <Link to="/feature" component="">Feature</Link>
//         </div>
//       )
//     } else {
//       return (
//         <div>
//           <Link to="/signup" component="">Sign Up</Link>
//           <Link to="/signin" component="">Sign In</Link>
//         </div>
//       )
//     }
//   }
//
//   render() {
//     return (
//       <div className="header">
//         <Link to="/" component="">Dashboard</Link>
//         {this.renderLinks()}
//       </div>
//     );
//   }
// }
// // TODO - orig - refact-layout END

// TODO - refact - refact-layout BEGIN
class Header extends Component {

  renderLinks() {
    console.log('this.props = ', this.props);
    console.log('window.location.pathname = ', window.location.pathname);
    // console.log('this.props.location.pathname = ', this.props.location.pathname);
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/about" component="">About</Link>
          <Link to="/dashboard " component="">Dashboard</Link>
          <Link to="/signout" component="">Sign Out</Link>
        </div>
      )
    }
    if (!this.props.authenticated) {
      return (
        <div>
          <Link to="/about" component="">About</Link>
          <Link to="/signup" component="">Sign Up</Link>
          <Link to="/signin" component="">Sign In</Link>
        </div>
      )
    }
  }

  // TODO - attempt 1
  // renderLinks() {
  //   console.log('this.props = ', this.props);
  //   console.log('window.location.pathname = ', window.location.pathname);
  //   // console.log('this.props.location.pathname = ', this.props.location.pathname);
  //   if (this.props.authenticated && window.location.pathname === '/dashboard') {
  //     return (
  //       <div>
  //         <Link to="/about" component="">About</Link>
  //         <Link to="/signout" component="">Sign Out</Link>
  //       </div>
  //     )
  //   }
  //   if (this.props.authenticated && window.location.pathname === '/about') {
  //     return (
  //       <div>
  //         <Link to="/dashboard" component="">Dashboard</Link>
  //         <Link to="/signout" component="">Sign Out</Link>
  //       </div>
  //     )
  //   }
  //   if (!this.props.authenticated) {
  //     return (
  //       <div>
  //         <Link to="/about" component="">About</Link>
  //         <Link to="/signup" component="">Sign Up</Link>
  //         <Link to="/signin" component="">Sign In</Link>
  //       </div>
  //     )
  //   }
  // }

  render() {
    return (
      <div className="header">
        {/*<Link to="/about" component="">About</Link>*/}
        {this.renderLinks()}
      </div>
    );
  }
}
// TODO - refact - refact-layout END

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
};

export default connect(mapStateToProps)(Header);