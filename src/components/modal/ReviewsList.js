import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setModalView } from '../../actions/action_modal';
import {
  setReviewToEdit,
  deleteReview
} from '../../actions/action_reviews';
import '../css/normalize_form.css';
import '../css/common_button.css';
import './review_list.css';

class ReviewList extends Component {

  handleAddReview(e) {
    e.preventDefault();
    // Change Modal's view to "AddReviewForm".
    this.props.setModalView('add_review_form');
  }

  handleEditButtonClick(e, reviewToEdit) {
    e.preventDefault();
    this.props.setReviewToEdit(reviewToEdit);
    this.props.setModalView('edit_review_form');
  }

  handleDeleteButtonClick(e, reviewId) {
    e.preventDefault();
    const userId = this.props.auth.userId;
    this.props.deleteReview(userId, reviewId, () => {
      // redirect to Location Detail Modal view.
      this.props.setModalView('location_detail');
    })
  }

  renderList() {
    // get locationId of clicked Marker.
    const locationId = this.props.mapData.locationId;
    let reviews = this.props.reviews;

    // Sort reviews. Most recent at top of list.
    const compare = (a, b) => {
      let comparison = 0;
      if ( a.date > b.date ) {
        comparison = -1;
      } else if ( a.date < b.date ) {
        comparison = 1
      }
      return comparison;
    };

    reviews.sort(compare);

    // Find User review(s) which match the clicked Marker's location id.
    return reviews.map((review, index) => {

      if (review.locationId === locationId) {
        return (
          <li
            key={index}
            className="review_list_li"
          >
            <div className="review_buttons_wrapper">
              <button
                className="review_edit_button"
                type="button"
                onClick={(e) => this.handleEditButtonClick(e, review)}
              >Edit</button>
              <button
                className="review_delete_button"
                type="button"
                onClick={(e) => this.handleDeleteButtonClick(e, review._id)}
              >Delete</button>
            </div>

            <div className="review_date">Date Visited:<span>{review.date}</span></div>
            <div className="review_header">Review:</div>
            <div className="review_review">{review.review}</div>
          </li>
        )
      }
      return false;
    });

  }

  render() {

    // On first React render,
    // "this.props.mapData.locationId" is undefined. Thus return early.
    if (!this.props.mapData.locationId) {return false;}

    // Determine if Location is CLOSED.
    // If CLOSED, don't display Reviews List.
    const location = this.props.mapData.cachedLocations.find((location) => {
      return location._id === this.props.mapData.locationId;
    });
    const isLocationClosed = location.outOfBusiness;

    return (
      <div>
        {!isLocationClosed ?
          <div className="review_list_wrapper">
            <div className="review_list_header">
              <h2>Reviews:</h2>
              <div className="review_list_add_review_button_wrapper">
                <button
                  className="review_list_add_review_button"
                  type="button"
                  onClick={(e) => this.handleAddReview(e)}
                >Add Review</button>
              </div>
            </div>
            <ul className="review_list_ul">
              {this.renderList()}
            </ul>
          </div>
          : ""
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    mapData: state.mapData,
    reviews: state.reviews.reviews
  }
};

export default connect(mapStateToProps,
  { setModalView,
    deleteReview,
    setReviewToEdit
  })(ReviewList);