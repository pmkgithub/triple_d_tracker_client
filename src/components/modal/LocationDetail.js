import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setModalView } from '../../actions/action_modal';
import "./location_detail.css";

class LocationDetail extends Component {

  handleAddReview() {
    // Change Modal's view to "AddReviewForm".
    this.props.setModalView('add_review_form');
  }

  render() {

    // On first render, "this.props.mapData.locationId" is undefined. Return early.
    if (!this.props.mapData.locationId) {return false;}

    // Find the desired location from cachedLocations.
    const location = this.props.mapData.cachedLocations.find((location) => {
      return location._id === this.props.mapData.locationId;
    });

    return (
      <div className="location_detail_wrapper">
        {location.outOfBusiness ? <h2 className="location_name location_out_biz">{location.name + ' (CLOSED)'}</h2>
          : <h1 className="location_name location_in_biz">{location.name}</h1>}

        <div className="location_info_wrapper">
          <div className="location_addr">{location.addrFull}</div>
          <div className="location_phone">{location.phone === 'none' ? 'No Phone Number' : 'Phone: ' + location.phone}</div>
          {location.url === 'none' ?
            <div>No URL Available</div> :
            <a
              className="location_url"
              href={'//' + location.url}
              target="_blank"
            >{location.url}</a>
          }
        </div>
        <div className="location_about_wrapper">
          <h3 className="location_about">About:</h3>
          <p>{location.about}</p>
        </div>
        <div className="location_add_review_button_wrapper">
          {location.outOfBusiness
            ? <span></span>
            : <span
              className="location_add_review_button"
              onClick={() => this.handleAddReview()}
            >Add Review</span>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    mapData: state.mapData,
    reviews: state.reviews
  };
};

export default connect(mapStateToProps, {setModalView} )(LocationDetail);