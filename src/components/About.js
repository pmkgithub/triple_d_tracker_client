import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentRoute } from "../actions/action_route";

class About extends Component {
  render() {
    this.props.setCurrentRoute(window.location.pathname);
    return (
      <div>This is the About page...
        <div>Overview:</div>
        <div>Create a User Account:</div>
        <div>Create, Edit, Delete a Review:</div>
      </div>
    )
  }
}

export default connect(null, {setCurrentRoute})(About);