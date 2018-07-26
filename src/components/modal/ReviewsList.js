import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setModalView } from '../../actions/action_modal';
import {
  deleteReview,
  setReviewToEditId
} from '../../actions/action_reviews';
import '../css/normalize_form.css';
import '../css/common_button.css';
import './review_list.css';

class ReviewList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isReviewListEmpty: true
    }
  }

  handleEditButtonClick(e, reviewToEditId) {
    e.preventDefault();
    // Set the id of the review to edit, so <EditReviewForm/> has access
    // to this id when it fetches the "review to edit" from API.
    this.props.setReviewToEditId(reviewToEditId);
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

    return this.props.reviews.map((review, index) => {

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
                onClick={(e) => this.handleEditButtonClick(e, review._id)}
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

    // Add or remove review list border depending if reviews exist or not
    // for this location.
    let reviewListClassName;
    !this.state.isReviewListEmpty
      ? reviewListClassName = "review_list_wrapper"
      : reviewListClassName = "review_list_wrapper border_none";

    return (
      <div className={reviewListClassName}>
        <ul className="review_list_ul">
          {this.renderList()}
        </ul>
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
  { deleteReview,
    setModalView,
    setReviewToEditId
  })(ReviewList);