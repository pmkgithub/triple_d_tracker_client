import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setModalView,
} from '../../actions/action_modal';
import {
  setReviewToEditId,
  fetchReviewToEdit,
  editReview,
  // // TODO - HAS_EDIT_REVIEW_FORM_OPENED -> delete if not needed.
  // hasEditReviewFormOpened,
} from '../../actions/action_reviews';
import "../css/normalize_form.css";
import "../css/common_button.css";
import "./add_edit_review_form.css";

class EditReviewForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: '',
      review: ''
    };

  }

  // Overview - first time this component render:
  // 1) Fetch review to edit,
  // 2) populate the edit review form with returned review data.
  componentDidMount() {

    // // TODO - HAS_EDIT_REVIEW_FORM_OPENED -> delete if not needed.
    // this.props.hasEditReviewFormOpened(true);

    const reviewToEditId = this.props.reviews.reviewToEditId;

    if (!this.props.reviews.reviewToEdit) {
      // 1) fetchReviewToEdit() fetches review to edit,
      // 2) on fetchReviewToEditSuccess, the reviewToEdit is set in Redux.
      this.props.fetchReviewToEdit(reviewToEditId)
          .then(() => {
            // Populate EditReviewForm with "Review To Be Edited" data.
            const {date, review} = this.props.reviews.reviewToEdit;
            this.setState({date: date, review:review});
          })
    }
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.setModalView('location_detail');
  }

  onFormSubmit(e) {
    e.preventDefault();

    const userId = this.props.auth.userId;
    const reviewToEditId = this.props.reviews.reviewToEditId;

    const toUpdate = {
      date: this.state.date,
      review: this.state.review
    };

    this.props.editReview(userId, reviewToEditId, toUpdate, () => {
      // redirect to Location Detail Modal view.
      this.props.setModalView('location_detail');
    });
    this.setState({date: '', review: ''});
  }

  onInputChange(e) {
    this.setState({date: e.target.value});
  }

  onTextareaChange(e) {
    this.setState({review: e.target.value});
  }

  render() {

    // Find the desired location from cachedLocations, add location name to Form.
    const location = this.props.mapData.cachedLocations.find((location) => {
      return location._id === this.props.mapData.locationId;
    });

    return (
      <div className="edit_review_form_wrapper">
        <h2>Edit Review for {location.name}</h2>
        <form onSubmit={(e) => this.onFormSubmit(e)} className="edit_review_form">
          <fieldset>
            <label
              className="edit_review_date_label"
              htmlFor="edit_review_date_input"
            >Date Visited:</label>
            <input
              id="edit_review_date_input"
              className="edit_review_date_input"
              type="date"
              placeholder="Enter Date Visited"
              value={this.state.date}
              onChange={(e) => this.onInputChange(e)}/>
          </fieldset>
          <fieldset>
            <label
              className="edit_review_textarea_label"
              htmlFor="edit_review_textarea"
            >Review:</label>
            <textarea
              id="edit_review_textarea"
              className="edit_review_textarea"
              placeholder="Enter your review here."
              value={this.state.review}
              onChange={(e) => this.onTextareaChange(e)}
            >
          </textarea>
          </fieldset>
          <div className="edit_review_buttons_wrapper">
            <button
              className="edit_review_cancel_button"
              type="button"
              onClick={(e) => {this.handleCancel(e)}}
            >Cancel</button>
            <button
              className="edit_review_submit_button"
              type="submit"
            >Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    mapData: state.mapData,
    modal: state.modal,
    reviews: state.reviews
  }
};

export default connect(mapStateToProps,
  {
    setModalView,
    setReviewToEditId,
    fetchReviewToEdit,
    editReview,
    // // TODO - HAS_EDIT_REVIEW_FORM_OPENED -> delete if not needed.
    // hasEditReviewFormOpened,
  })(EditReviewForm);
