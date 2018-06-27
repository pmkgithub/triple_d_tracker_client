import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
  class ComposedComponent extends Component {

    // added in Section 3 - Lecture 76.
    // handles case when our component renders the first time.
    componentDidMount() {
      this.shouldNavigageAway();
    }

    // our component just got updated (e.g. user clicks "Sign Out".
    componentDidUpdate() {
      this.shouldNavigageAway();
    }

    shouldNavigageAway() {
      if (!this.props.auth) {
        // console.log('I need to leave!!!!');
        this.props.history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props}/>;
    }
  }

  const mapStateToProps = (state) => {
    return {
      // NOTE: auth.authenticated is the token...
      auth: state.auth.authenticated
    }
  };

  return connect(mapStateToProps)(ComposedComponent);
}