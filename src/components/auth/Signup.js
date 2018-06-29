import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './signup_signin.css';

class Signup extends Component {

  componentDidMount() {
    // clear any lingering error messages.
    this.props.authError("");
  }

  renderField(field) {

    return (
      <div>
        <label
          className={field.labelClassName}
          htmlFor={field.labelHtmlFor}
        >{field.label}</label>
        <input
          {...field.input}
          id={field.id}
          className={field.className}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          autoComplete="none"
          // required
        />
        <div className="input-error-message">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  // Arrow Function allows us not to need binding "this".
  onSubmit = (formProps) => {
    // formProps contains: email, password, confPassword.
    // All get sent to API server.
    // API's authController verifies that "email", "password" are present in req.body.
    // API's authController disregards "confPassword" in req.body.
    this.props.signup(formProps, () => {
      this.props.history.push('/feature');
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signup-form-wrapper">
        <form
          className="signup-form"
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <legend>Sign Up</legend>
          <div className="auth-error-message">{this.props.authErrorMessage}</div>
          <fieldset>
            <Field
              label="Email"
              labelClassName="signup-label"
              labelHtmlFor="signup-email"

              id="signup-email"
              className="signup-email-input"
              name="email"
              type="email"
              placeholder="me@example.com"
              component={this.renderField}
            />
          </fieldset>
          <fieldset>
            <Field
              label="Password"
              labelClassName="signup-label"
              labelHtmlFor="signup-password"

              id="signup-password"
              className="signup-password-input"
              name="password"
              type="password"
              placeholder="mypassword"
              component={this.renderField}
            />
          </fieldset>
          <fieldset>
            <Field
              label="Confirm Password"
              labelClassName="signup-label"
              labelHtmlFor="signup-conf-password"

              id="signup-conf-password"
              className="signup-conf-password-input"
              name="confPassword"
              type="password"
              placeholder="mypassword"
              component={this.renderField}

            />
          </fieldset>
          <button className="signup-button" type="submit">Sign Up!</button>
        </form>
        <div className="link-wrapper">Already have an account?
            <Link className="signin-link" to="/signin">Sign In</Link>
        </div>
      </div>
    );
  }
}

const validate = (values) => {

  const errors = {};

  // Validate the inputs from "values".
  if (!values.email) {
    errors.email = "Must Enter Email"
  }

  if (!values.password) {
    errors.password = "Must Enter Password"
  }

  if (!values.confPassword) {
    errors.confPassword = "Must Enter Password"
  }

  if (values.password !== values.confPassword) {
    errors.confPassword = "Passwords Must Match"
  }
  // If errors is empty, the form is OK to submit.
  // If errors has any properties, reduxForm assumes form is invalid.
  return errors;
};

// // syntax NOT using compose.
// export default reduxForm({
//   form: 'signup'
// })(
//   connect(null, actions)(Signup)
// )

const mapStateToProps = (state) => {
  return {
    authErrorMessage: state.auth.authErrorMessage
  }
};

// syntax USING compose -> allows us to pass in multiple HOC's.
export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'signup',
    validate: validate
  })
)(Signup);

