import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setModalView,
} from '../../actions/action_modal';
import {
  createReview
} from '../../actions/action_reviews';

class AddReviewForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: '',
      review: ''
    };

  }

  handleCancel(e) {
    e.preventDefault();
    this.props.setModalView('location_detail');
  }

  onFormSubmit(e) {
    e.preventDefault();

    const reviewData = {
      userId: this.props.auth.userId,
      locationId: this.props.mapData.locationId,
      date: this.state.date,
      review: this.state.review
    };

    this.props.createReview(reviewData, () => {
      this.props.setModalView('location_detail');
    });
    this.setState({date: '', review: ''});
  }

  onInputChange(e) {
    // console.log(event.target.value);
    this.setState({date: e.target.value});
  }

  onTextareaChange(e) {
    // console.log(event.target.value);
    this.setState({review: e.target.value});
  }

  render() {
    return (
      <form onSubmit={(e) => this.onFormSubmit(e)} className="input-group">
        <fieldset>
          <label
            className="date_visited_label"
            htmlFor="date_visited_input"
          >Date Visited:</label>
          <input
            id="date_visited_input"
            className="date_visited_input"
            type="date"
            placeholder="Enter Date Visited"
            value={this.state.date}
            onChange={(e) => this.onInputChange(e)}/>
        </fieldset>
        <fieldset>
          <label
            className="review_label"
            htmlFor="review_textarea"
          >Review:</label>
          <textarea
            id="review_textarea"
            className="review_textarea"
            placeholder="Enter your review here."
            value={this.state.review}
            onChange={(e) => this.onTextareaChange(e)}
          >
          </textarea>
        </fieldset>
        <div className="buttons_wrapper">
         <button
           className="cancel_button"
           type="button"
           onClick={(e) => {this.handleCancel(e)}}
         >Cancel</button>
         <button
           className="submit_button"
           type="submit"
         >Submit</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    mapData: state.mapData,
    modal: state.modal,
  }
};

export default connect(mapStateToProps, {setModalView, createReview})(AddReviewForm);

////////////////////////////////////////////////////////////////////
// // REDUX-FORM inside a Modal - not working.
////////////////////////////////////////////////////////////////////
// import React, { Component } from 'react';
// import { reduxForm } from 'redux-form';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import {
//   setModalView
// } from '../../actions/action_modals';
// import './add_review_form.css';
//
// class AddReviewForm extends Component {
//
//   handleCancel(e) {
//     e.preventDefault();
//     this.props.setModalView('location_detail');
//   }
//
//   // Arrow Function allows us not to need binding this.
//   onSubmit({date, review}) {
//     console.log('this.props = ', this.props);
//     console.log('AddReviewForm.js onSubmit date_visted = ', date);
//     console.log('AddReviewForm.js onSubmit review = ', review);
//     // this.props.signin(formProps, () => {
//     //   this.props.history.push('/feature');
//     // });
//   };
//
//   // form methods - END
//
//   render() {
//     const { handleSubmit, fields: { date, review } } = this.props;
//     return (
//         <div className="add_review_form_wrapper">
//           <form
//             className="add_review_form"
//             onSubmit={handleSubmit(this.onSubmit.bind(this))}
//           >
//             <legend>Add Review</legend>
//             <div className="auth-error-message">{this.props.authErrorMessage}</div>
//             <fieldset>
//               <label
//                 className="date_visited_label"
//                 htmlFor="date_visited_input"
//               >Date Visited:</label>
//               <input
//                 {...date}
//                 id="date_visited_input"
//                 // className="date_visited_input"
//                 type="date"
//                 placeholder="01/01/2010"
//               />
//             </fieldset>
//             <fieldset>
//               <label
//                 className="review_label"
//                 htmlFor="review_textarea"
//               >Review:</label>
//               <textarea
//                 {...review}
//                 id="review_textarea"
//                 // className="review_textarea"
//                 placeholder="Enter your review here!"
//               >
//               </textarea>
//             </fieldset>
//             <div className="buttons_wrapper">
//               <button
//                 className="cancel_button"
//                 type="button"
//                 onClick={(e) => {this.handleCancel(e)}}
//               >Cancel</button>
//               <button
//                 className="add_review_button"
//                 type="submit"
//               >Add Review</button>
//             </div>
//           </form>
//
//         </div>
//     )
//   }
// }
//
// // const validate = (values) => {
// //   console.log('AddReviewsModal.js validate values, ', values);
// //   const errors = {};
// //
// //   // Validate the inputs from "values".
// //   if (!values.date_visited) {
// //     errors.date_visited = "Must Enter Date Visited"
// //   }
// //
// //   if (!values.review) {
// //     errors.review = "Must Enter a Review"
// //   }
// //   // If errors is empty, the form is OK to submit.
// //   // If errors has any properties, reduxForm assumes form is invalid.
// //   return errors;
// // };
//
// const mapStateToProps = (state) => {
//   return { modal: state.modal }
// };
//
// // export default connect(mapStateToProps,
// //   { setIsLocationModalOpen,
// //     setIsAddReviewModalOpen
// //   })(AddReviewModal);
//
// // export default compose(
// //   connect(mapStateToProps, {setModalView}),
// //   reduxForm({
// //     form: 'addReview',
// //     fields: ['date', 'review'],
// //
// //   })
// // )(AddReviewForm);
//
// export default reduxForm({
//   form: 'addReview',
//   fields: ['date', 'review']
// })(AddReviewForm);