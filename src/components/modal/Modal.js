import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import {
  setIsModalOpen,
  setLocationId,
} from '../../actions/action_modals';
import './modal.css';

import LocationDetail from './LocationDetail';

class Modal extends Component {

  closeModal() {
    this.props.setIsModalOpen(false);
    this.props.setLocationId('');
  }

  afterOpenModal() {
    // this.subtitle.style.color = '#f00';
    // this.red.style.color = '#f00';
    // this.green.style.color = '#f00';
  }

  render() {
    return (
      <ReactModal
        isOpen={this.props.modal.isModalOpen}
        onAfterOpen={() => {this.afterOpenModal()}}
        overlayClassName="overlay"
        className="modal"
        ariaHideApp={false} // disables aria
        // contentLabel="Example Modal" // for aria.
      >
        <div className="modal_button_close" onClick={() => {this.closeModal()}}>X</div>
        {this.props.modal.modalView === 'location_detail' && <LocationDetail/>}
      </ReactModal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mapData: state.mapData,
    modal: state.modal
  };
};

export default connect(mapStateToProps,
  { setIsModalOpen,
    setLocationId
  })(Modal);