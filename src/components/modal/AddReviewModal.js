// import React, { Component } from 'react';
// import { reduxForm } from 'redux-form';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import Modal from 'react-modal';
// import {
//   setIsLocationModalOpen,
//   setIsAddReviewModalOpen
// } from '../../actions/action_modals';
// import './modal.css';
//
//
// class AddReviewModal extends Component {
//
//   // modal methods - BEGIN
//   closeModal() {
//     this.props.setIsAddReviewModalOpen(false);
//     this.props.setIsLocationModalOpen(true);
//   }
//
//   afterOpenModal() {
//     // this.subtitle.style.color = '#f00';
//     // this.red.style.color = '#f00';
//     // this.green.style.color = '#f00';
//   }
//   // modal methods - END
//
//   // Arrow Function allows us not to need binding this.
//   onSubmit = (formProps) => {
//     console.log('AddReviewModal.js onSubmit formProps', formProps);
//     // this.props.signin(formProps, () => {
//     //   this.props.history.push('/feature');
//     // });
//   };
//   // form methods - END
//
//   render() {
//     const { handleSubmit } = this.props;
//     return (
//       <Modal
//         isOpen={this.props.modal.isAddReviewModalOpen}
//         onAfterOpen={() => {this.afterOpenModal()}}
//         overlayClassName="overlay"
//         className="modal"
//         ariaHideApp={false} // disables aria
//         // contentLabel="Example Modal" // for aria.
//       >
//         <div className="modal_button_close" onClick={() => {this.closeModal()}}>X</div>
//         <div>Add Review Form Modal</div>
//         <div className="add_review_modal_form_wrapper">
//           <form
//             className="add_review_modal_form"
//             onSubmit={handleSubmit(this.onSubmit)}
//           >
//             <legend>Add Review</legend>
//             <div className="auth-error-message">{this.props.authErrorMessage}</div>
//             <fieldset>
//               {/*<Field*/}
//                 {/*label="Date Visited:"*/}
//                 {/*labelClassName="add_review_modal_date_visited_label"*/}
//
//                 {/*labelHtmlFor="add_review_modal_date_visited_input"*/}
//                 {/*id="add_review_modal_date_visited_input"*/}
//                 {/*className="add_review_modal_date_visited_input"*/}
//                 {/*name="date_visited"*/}
//                 {/*type="date"*/}
//                 {/*placeholder="01/01/2010"*/}
//                 {/*component={this.renderField}*/}
//               {/*/>*/}
//               <label
//                 className="add_review_modal_date_visited_label"
//                 htmlFor="add_review_modal_date_visited_input"
//               >Date Visited</label>
//               <input
//                 id="add_review_modal_date_visited_input"
//                 className="add_review_modal_date_visited_input"
//                 name="date_visited"
//                 type="date"
//                 placeholder="01/01/2010"
//               />
//             </fieldset>
//             <fieldset>
//               {/*<Field*/}
//                 {/*label="Review:"*/}
//                 {/*labelClassName="add_review_modal_review_label"*/}
//
//                 {/*labelHtmlFor="add_review_modal_review_textarea"*/}
//                 {/*id="add_review_modal_review_textarea"*/}
//                 {/**/}
//                 {/*name="review"*/}
//                 {/*type="textarea"*/}
//                 {/*placeholder="Enter your review here!"*/}
//                 {/*component={this.renderField}*/}
//               {/*/>*/}
//               <label
//                 className="add_review_modal_date_visited_label"
//                 htmlFor="add_review_modal_date_visited_input"
//               >Review</label>
//               <textarea
//                 id="add_review_modal_review_textarea"
//                 className="add_review_modal_review_textarea"
//                 name="review"
//                 placeholder="Enter your review here!"
//               >
//               </textarea>
//             </fieldset>
//             <button className="add_review_modal_button" type="submit">Add Review</button>
//           </form>
//         </div>
//
//       </Modal>
//     )
//   }
// }
//
// const validate = (values) => {
//   console.log('AddReviewsModal.js validate values, ', values);
//   const errors = {};
//
//   // // Validate the inputs from "values".
//   // if (!values.email) {
//   //   errors.email = "Must Enter Email"
//   // }
//   //
//   // if (!values.password) {
//   //   errors.password = "Must Enter Password"
//   // }
//   // If errors is empty, the form is OK to submit.
//   // If errors has any properties, reduxForm assumes form is invalid.
//   return errors;
// };
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
// // syntax USING compose -> allows us to pass in multiple HOC's.
// export default compose(
//   connect(mapStateToProps, {setIsLocationModalOpen, setIsAddReviewModalOpen}),
//   reduxForm({
//     form: 'add_review',
//     validate: validate
//   })
// )(AddReviewModal);