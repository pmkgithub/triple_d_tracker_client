import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom'
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './signup_signin.css';

class Signin extends Component {

  componentDidMount() {
    // clear any lingering error messages.
    this.props.authError("");
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
          <fieldset>
            <label
              className="signin-label"
              htmlFor="signin-email"
            >Email</label>
            <Field
              id="signin-email"
              className="signin-email-input"
              name="email"
              type="email"
              component="input"
              autoComplete="none"
              placeholder="me@example.com"
              required
            />
          </fieldset>
          <fieldset>
            <label
              className="signin-label"
              htmlFor="signin-password"
            >Password</label>
            <Field
              id="signin-password"
              className="signin-password-input"
              name="password"
              type="password"
              component="input"
              autoComplete="none"
              placeholder="mypassword"
              required
            />
          </fieldset>
          <div>{this.props.errorMessage}</div>
          <button
            className="signin-button"
          >Sign In!</button>
        </form>
        <div className="link-wrapper">Don't have an account?
          <Link className="signup-link" to="/signup">Sign Up</Link>
        </div>
      </div>

    );
  }
}

// // syntax NOT using compose.
// export default reduxForm({
//   form: 'Signin'
// })(
//   connect(null, actions)(Signin)
// )

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage
  }
};

// syntax USING compose -> allows us to pass in multiple HOC's.
export default compose(
  connect(mapStateToProps, actions),
  reduxForm({form: 'signin'})
)(Signin);

