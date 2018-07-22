import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {
  setIsModalOpen,
  setLocationId
} from '../../actions/action_modal';
import "./modal.css";

class LocationModal extends Component {

  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);

  }

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

    const location = this.props.mapData.cachedLocations.find((location) => {
      return location._id === this.props.modal.locationId;
    });

    if ( !location ) { return false }

    return (

      <Modal
        isOpen={this.props.modal.isModalOpen}
        onAfterOpen={this.afterOpenModal}
        overlayClassName="overlay"
        className="modal"
        ariaHideApp={false} // disables aria
        // contentLabel="Example Modal" // for aria.
      >
        {/*<div>This is a Modal</div>*/}
        <div className="modal_button_close" onClick={this.closeModal}>X</div>
        {/*<h2 ref={red => this.red = red}>{location.outOfBusiness ?  location.name + ' (CLOSED)': location.name}</h2>*/}
        {/*<h2 className="modal_location_name">{location.outOfBusiness ?  location.name + ' (CLOSED)': location.name}</h2>*/}

        <div className="modal_location_detail_wrapper">
          {location.outOfBusiness ? <h2 className="modal_location_name modal_location_out_biz">{location.name + ' (CLOSED)'}</h2>
            : <h1 className="modal_location_name modal_location_in_biz">{location.name}</h1>}

          <div className="modal_location_info-wrapper">
            <div className="modal_location_addr">{location.addrFull}</div>
            <div className="modal_location_phone">{location.phone === 'none' ? 'No Phone Number' : 'Phone: ' + location.phone}</div>
            {location.url === 'none' ?
              <div>No URL Available</div> :
              <a
                className="modal_location_url"
                href={'//' + location.url}
                target="_blank"
              >{location.url}</a>
            }
          </div>
          <div className="modal_about_wrapper">
            <h3 className="modal_location_about">About:</h3>
            <p>{location.about}</p>
          </div>
          <div className="add-review-button-wrapper">
            {location.outOfBusiness ? <div></div> : <div className="modal_add_review_button">Add Review</div>}
            {/*<div className="modal_add_review_button">Add Review</div>*/}
          </div>
        </div>

      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { mapData: state.mapData, modal: state.modal };
};

export default connect(mapStateToProps, { setIsModalOpen, setLocationId })(LocationModal)