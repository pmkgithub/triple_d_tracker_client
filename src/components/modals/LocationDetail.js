import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setIsLocationModalOpen,
  setLocationId,
} from '../../actions/action_modals';
import "./location_detail.css";

class LocationDetail extends Component {

  render() {

    const location = this.props.mapData.cachedLocations.find((location) => {
      return location._id === this.props.modal.locationId;
    });

    return (
      <div className="location_modal_location_detail_wrapper">
        {location.outOfBusiness ? <h2 className="location_modal_location_name location_modal_location_out_biz">{location.name + ' (CLOSED)'}</h2>
          : <h1 className="location_modal_location_name location_modal_location_in_biz">{location.name}</h1>}

        <div className="location_modal_location_info_wrapper">
          <div className="location_modal_location_addr">{location.addrFull}</div>
          <div className="location_modal_location_phone">{location.phone === 'none' ? 'No Phone Number' : 'Phone: ' + location.phone}</div>
          {location.url === 'none' ?
            <div>No URL Available</div> :
            <a
              className="location_modal_location_url"
              href={'//' + location.url}
              target="_blank"
            >{location.url}</a>
          }
        </div>
        <div className="location_modal_location_about_wrapper">
          <h3 className="location_modal_location_about">About:</h3>
          <p>{location.about}</p>
        </div>
        <div
          className="location_modal_add_review_button_wrapper"
          onClick={() => this.handleAddReview()}
        >
          {location.outOfBusiness ? <div></div> : <div className="location_modal_add_review_button">Add Review</div>}
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    mapData: state.mapData,
    modal: state.modal
  };
};

export default connect(mapStateToProps,
  { setIsLocationModalOpen,
    setLocationId,
  })(LocationDetail);
