import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom';
import Nav from './Nav';
import BackgroundImage01 from './BackgroundImage01';
// Font Awesome - BEGIN
import { library as faLibrary} from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // do this in Component
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
faLibrary.add(faCheck, faSpinner);
// Font Awesome - END

class App extends Component {

  render() {
    return (
      <div className="app">
        { this.props.currentRoute === '/'       && <BackgroundImage01/> }
        { this.props.currentRoute === '/signup' && <BackgroundImage01/> }
        { this.props.currentRoute === '/signin' && <BackgroundImage01/> }
        <Nav/>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentRoute: state.currentRoute.currentRoute
  }
};

// export default connect(mapStateToProps)(App);
export default compose(
  withRouter,
  connect(mapStateToProps)
)(App);
