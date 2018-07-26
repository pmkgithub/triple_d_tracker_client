import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import LocationDetail from './LocationDetail';
import AddReviewForm from './AddReviewForm';
import EditReviewForm from './EditReviewForm';
import ReviewList from './ReviewsList'
import {
  setIsModalOpen,
} from '../../actions/action_modal';
import {
  setLocationId,
} from '../../actions/action_locations';
import './modal.css';

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
        <div className="modal_button_close_wrapper">
          {this.props.modal.modalView === 'location_detail'
            ? <span className="modal_button_close" onClick={() => {this.closeModal()}}>X</span>
            : ''
          }
        </div>
        {this.props.modal.modalView === 'location_detail' && <LocationDetail/>}
        {this.props.modal.modalView === 'location_detail' && <ReviewList/>}
        {this.props.modal.modalView === 'add_review_form' && <AddReviewForm/>}
        {this.props.modal.modalView === 'edit_review_form' && <EditReviewForm/>}
      </ReactModal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    mapData: state.mapData
  };
};

export default connect(mapStateToProps,
  { setIsModalOpen,
    setLocationId
  })(Modal);