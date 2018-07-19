import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

class LocationModal extends Component {

  render() {
    return (
      <Modal>

      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { mapData: state.mapData };
};

export default connect(mapStateToProps, null)(LocationModal)