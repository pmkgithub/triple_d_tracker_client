import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  setModalView
} from '../../actions/action_modals';
import './add_review_form.css';

class AddReviewForm extends Component {

  handleClick() {
    this.props.setModalView('location_detail');
  }

  // Arrow Function allows us not to need binding this.
  onSubmit = (formProps) => {
    console.log('AddReviewModal.js onSubmit formProps', formProps);
    // this.props.signin(formProps, () => {
    //   this.props.history.push('/feature');
    // });
  };
  // form methods - END

  render() {
    const { handleSubmit } = this.props;
    return (
        <div className="add_review_modal_form_wrapper">
          <div
            onClick={() => {this.handleClick()}}
          >Return to Location Detail</div>
          <form
            className="add_review_modal_form"
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <legend>Add Review</legend>
            <div className="auth-error-message">{this.props.authErrorMessage}</div>
            <fieldset>
              {/*<Field*/}
              {/*label="Date Visited:"*/}
              {/*labelClassName="add_review_modal_date_visited_label"*/}

              {/*labelHtmlFor="add_review_modal_date_visited_input"*/}
              {/*id="add_review_modal_date_visited_input"*/}
              {/*className="add_review_modal_date_visited_input"*/}
              {/*name="date_visited"*/}
              {/*type="date"*/}
              {/*placeholder="01/01/2010"*/}
              {/*component={this.renderField}*/}
              {/*/>*/}
              <label
                className="add_review_modal_date_visited_label"
                htmlFor="add_review_modal_date_visited_input"
              >Date Visited</label>
              <input
                id="add_review_modal_date_visited_input"
                className="add_review_modal_date_visited_input"
                name="date_visited"
                type="date"
                placeholder="01/01/2010"
              />
            </fieldset>
            <fieldset>
              {/*<Field*/}
              {/*label="Review:"*/}
              {/*labelClassName="add_review_modal_review_label"*/}

              {/*labelHtmlFor="add_review_modal_review_textarea"*/}
              {/*id="add_review_modal_review_textarea"*/}
              {/**/}
              {/*name="review"*/}
              {/*type="textarea"*/}
              {/*placeholder="Enter your review here!"*/}
              {/*component={this.renderField}*/}
              {/*/>*/}
              <label
                className="add_review_modal_date_visited_label"
                htmlFor="add_review_modal_date_visited_input"
              >Review</label>
              <textarea
                id="add_review_modal_review_textarea"
                className="add_review_modal_review_textarea"
                name="review"
                placeholder="Enter your review here!"
              >
              </textarea>
            </fieldset>
            <button className="add_review_modal_button" type="submit">Add Review</button>
          </form>
        </div>
    )
  }
}

const validate = (values) => {
  console.log('AddReviewsModal.js validate values, ', values);
  const errors = {};

  // // Validate the inputs from "values".
  // if (!values.email) {
  //   errors.email = "Must Enter Email"
  // }
  //
  // if (!values.password) {
  //   errors.password = "Must Enter Password"
  // }
  // If errors is empty, the form is OK to submit.
  // If errors has any properties, reduxForm assumes form is invalid.
  return errors;
};

const mapStateToProps = (state) => {
  return { modal: state.modal }
};

// export default connect(mapStateToProps,
//   { setIsLocationModalOpen,
//     setIsAddReviewModalOpen
//   })(AddReviewModal);

export default compose(
  connect(mapStateToProps, {setModalView}),
  reduxForm({
    form: 'add_review',
    validate: validate
  })
)(AddReviewForm);

// export default AddReviewForm;