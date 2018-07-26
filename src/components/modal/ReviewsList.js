import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setModalView } from '../../actions/action_modal';
import {
  deleteReview,
  setReviewToEditId
} from '../../actions/action_reviews';

class ReviewList extends Component {

  handleDeleteButtonClick(reviewId) {
    const userId = this.props.auth.userId;
    this.props.deleteReview(userId, reviewId, () => {
      // redirect to Location Detail Modal view.
      this.props.setModalView('location_detail');
    })
  }

  handleEditButtonClick(reviewToEditId) {
    // Set the id of the review to edit, so <EditReviewForm/> has access
    // to this id when it fetches the "review to edit" from API.
    this.props.setReviewToEditId(reviewToEditId);
    this.props.setModalView('edit_review_form');
  }

  renderList() {
    // get locationId of clicked Marker.
    const locationId = this.props.mapData.locationId;

    // production
    return this.props.reviews.map((review, index) => {

      if (review.locationId === locationId) {
        return (
          <li
            key={index}
            className="review_list_li"
          >
            <div className="review_date">Date Visited:<span>{review.date}</span></div>
            <div className="review_review_header">Review:</div>
            <div className="review_review">{review.review}</div>
            <div
              className="review_delete_button"
              onClick={() => this.handleDeleteButtonClick(review._id)}
            >Delete</div>
            <div
              className="review_edit_button"
              onClick={() => this.handleEditButtonClick(review._id)}
            >Edit</div>
          </li>
        )
      }
      return false;
    });

  }

  render() {
    return (
      <ul className="review_list_ul">
        {this.renderList()}
      </ul>
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
  { deleteReview,
    setModalView,
    setReviewToEditId
  })(ReviewList);