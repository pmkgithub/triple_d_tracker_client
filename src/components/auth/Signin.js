import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom'
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

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
        <legend>Sign In</legend>
        <form
          className="signin-form"
          onSubmit={handleSubmit(this.onSubmit)}
        >
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
          <button>Sign In!</button>
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

