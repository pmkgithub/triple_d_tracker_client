import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setModalView,
} from '../../actions/action_modal';
import {
  setReviewToEditId,
  fetchReviewToEdit,
  editReview,
} from '../../actions/action_reviews';
import "./edit_review_form.css";

class EditReviewForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: '',
      review: ''
    };

  }

  componentDidMount() {
    const reviewToEditId = this.props.reviews.reviewToEditId;
    console.log('EditReviewForm componentDidMount reviewToEditId = ', reviewToEditId);
    this.props.fetchReviewToEdit(reviewToEditId, () => {
      // redirect to Location Detail Modal view.
    });
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.setModalView('location_detail');
  }

  onFormSubmit(e) {
    e.preventDefault();

    const userId = this.props.auth.userId;
    const reviewId = this.props.reviews.reviewId;

    const toUpdate = {
      date: this.state.date,
      review: this.state.review
    };

    this.props.editReview(userId, reviewId, toUpdate, () => {
      // redirect to Location Detail Modal view.
      this.props.setModalView('location_detail');
    });
    this.setState({date: '', review: ''});
  }

  onInputChange(e) {
    this.setState({date: e.target.value});
  }

  onTextareaChange(e) {
    // console.log(event.target.value);
    this.setState({review: e.target.value});
  }

  render() {
    return (
      <div
        className="edit_review_form_wrapper"
      >
        <h3>Edit Review</h3>
        <form onSubmit={(e) => this.onFormSubmit(e)} className="input-group">
          <fieldset>
            <label
              className="edit_review_date_visited_label"
              htmlFor="edit_review_date_visited_input"
            >Date Visited:</label>
            <input
              id="edit_review_date_visited_input"
              className="edit_review_date_visited_input"
              type="date"
              placeholder="Enter Date Visited"
              value={this.state.date}
              onChange={(e) => this.onInputChange(e)}/>
          </fieldset>
          <fieldset>
            <label
              className="edit_review_review_label"
              htmlFor="edit_review_review_textarea"
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
  })(EditReviewForm);
