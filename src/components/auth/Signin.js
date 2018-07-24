import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './signup_signin.css';

class Signin extends Component {

  componentDidMount() {
    // Call authError Action Creator to clear any lingering error messages.
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

  // Arrow Function allows us not to need binding this.
  onSubmit = (formProps) => {
    this.props.signin(formProps, () => {
      this.props.history.push('/feature');
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signin-form-wrapper">
        <form
          className="signin-form"
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <legend>Sign In</legend>
          <div className="auth-error-message">{this.props.authErrorMessage}</div>
          <fieldset>
            <Field
              label="Email"
              labelClassName="signin-label"

              labelHtmlFor="signin-email"
              id="signin-email"
              className="signin-email-input"
              name="email"
              type="email"
              placeholder="me@example.com"
              component={this.renderField}
            />
          </fieldset>
          <fieldset>
            <Field
              label="Password"
              labelClassName="signin-label"

              labelHtmlFor="signin-password"
              id="signin-password"
              className="signin-password-input"
              name="password"
              type="password"
              placeholder="mypassword"
              component={this.renderField}
            />
          </fieldset>
          <button className="signin-button" type="submit">Sign In!</button>
        </form>
        <div className="link-wrapper">Don't have an account?
          <Link className="signup-link" to="/signup">Sign Up</Link>
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
  // If errors is empty, the form is OK to submit.
  // If errors has any properties, reduxForm assumes form is invalid.
  return errors;
};

// // syntax NOT using compose.
// export default reduxForm({
//   form: 'Signin'
// })(
//   connect(null, actions)(Signin)
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
    form: 'signin',
    validate: validate
  })
)(Signin);

