import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HeaderStyle.css';

class Header extends Component {

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout" component="">Sign Out</Link>
          <Link to="/feature" component="">Feature</Link>
        </div>
      )
    } else {
      return (
        <div>
          <Link to="/signup" component="">Sign Up</Link>
          <Link to="/signin" component="">Sign In</Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="header">
        <Link to="/" component="">Auth App</Link>
        {this.renderLinks()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
};

export default connect(mapStateToProps)(Header);