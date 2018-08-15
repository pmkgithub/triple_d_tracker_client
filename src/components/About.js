import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentRoute } from "../actions/action_currentRoute";
import demoimg from '../images/demo.png';

class About extends Component {

  componentWillMount() {
    this.props.setCurrentRoute(window.location.pathname); // for Nav.js links logic.
  }

  render() {
    return (
      <div>About Page
        <div>Overview:</div>
        <div>Create a User Account:</div>
        <div>Create, Edit, Delete a Review:</div>
        <img src={demoimg} alt=""/>
      </div>
    )
  }
}

export default connect(null, {setCurrentRoute})(About);