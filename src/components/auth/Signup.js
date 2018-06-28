import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
// import './signup_signin.css';

class Signup extends Component {

  componentDidMount() {
    // clear any lingering error messages.
    this.props.authError("");
  }

  // Arrow Function allows us not to need binding "this".
  onSubmit = (formProps) => {
    console.log('formProps = ', formProps);

    // this.props.signup(formProps, () => {
    //   this.props.history.push('/feature');
    // });
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
          <fieldset>
            <label
              className="signup-label"
              htmlFor="signup-email"
            >Email</label>
            <Field
              id="signup-email"
              className="signup-email-input"
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
              className="signup-label"
              htmlFor="signup-password"
            >Password</label>
            <Field
              id="signup-password"
              className="signup-password-input"
              name="password"
              type="password"
              component="input"
              autoComplete="none"
              placeholder="mypassword"
              required
            />
          </fieldset>
          <fieldset>
            <label
              className="signup-label"
              htmlFor="signup-conf-password"
            >Confirm Password</label>
            <Field
              id="signup-conf-password"
              className="signup-conf-password-input"
              name="conf-password"
              type="password"
              component="input"
              autoComplete="none"
              placeholder="mypassword"
              required
            />
          </fieldset>
          <div>{this.props.errorMessage}</div>
          <button className="signup-button" type="submit">Sign Up!</button>
        </form>
        <div className="link-wrapper">Already have an account?
            <Link className="signin-link" to="/signin">Sign In</Link>
        </div>
      </div>
    );
  }
}

// // syntax NOT using compose.
// export default reduxForm({
//   form: 'signup'
// })(
//   connect(null, actions)(Signup)
// )

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage
  }
};

// syntax USING compose -> allows us to pass in multiple HOC's.
export default compose(
  connect(mapStateToProps, actions),
  reduxForm({form: 'signup'})
)(Signup);

