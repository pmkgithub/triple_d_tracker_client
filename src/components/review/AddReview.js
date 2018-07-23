import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddReview extends Component {
  render() {
    return (
      <div>AddReview Form</div>
    )
  }
}

const mapStateToProps = (state) => {
  return { modal: state.modal }
};

export default connect()(AddReview)