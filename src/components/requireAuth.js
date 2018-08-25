import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
  class ComposedComponent extends Component {

    // HOC - for requiring authorization to access a protected route/asset.
    // Handles case when our component renders the first time.
    componentDidMount() {
      this.shouldNavigageAway();
    }

    // our component just got updated (e.g. user clicks "Sign Out".
    componentDidUpdate() {
      this.shouldNavigageAway();
    }

    shouldNavigageAway() {
      // If no value for auth prop, it means no token has been assigned to state.auth.
      // Thus, navigate away to root page.
      if (!this.props.auth) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props}/>;
    }
  }

  const mapStateToProps = (state) => {
    return {
      // NOTE: state.auth.authenticated is the token.
      auth: state.auth.authenticated
    }
  };

  return connect(mapStateToProps)(ComposedComponent);
}