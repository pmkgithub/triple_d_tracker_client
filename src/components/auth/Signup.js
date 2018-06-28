import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {

  componentDidMount() {
    // clear any lingering error messages.
    this.props.authError("");
  }

  // Arrow Function allows us not to need binding "this".
  onSubmit = (formProps) => {
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
          <fieldset>
            <label>Email</label>
            <Field
              name="email"
              type="text"
              component="input"
              autoComplete="none"
            />
          </fieldset>
          <fieldset>
            <label>Password</label>
            <Field
              name="password"
              type="password"
              component="input"
              autoComplete="none"
            />
          </fieldset>
          <div>{this.props.errorMessage}</div>
          <button>Sign Up!</button>
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

