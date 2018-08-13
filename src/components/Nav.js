import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './nav.css';

class Header extends Component {

  renderLinks() {

    if (!this.props.authenticated && this.props.currentRoute === '/') {
      return (
        <div>
          <Link to="/about">About</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      )
    }

    if (!this.props.authenticated && this.props.currentRoute === '/signup') {
      return (
        <div>
          <Link to="/about">About</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      )
    }

    if (!this.props.authenticated && this.props.currentRoute === '/signin') {
      return (
        <div>
          <Link to="/about">About</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )
    }

    if (!this.props.authenticated && this.props.currentRoute === '/about') {
      return (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      )
    }

    if (this.props.authenticated && this.props.currentRoute === '/dashboard') {
      return (
        <div>
          <Link to="/about">About</Link>
          <Link to="/signout">Sign Out</Link>
        </div>
      )
    }

    if (this.props.authenticated && this.props.currentRoute === '/about') {
      return (
        <div>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/signout">Sign Out</Link>
        </div>
      )
    }

  }

  render() {
    return (
      <div className="header">
        {this.renderLinks()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    currentRoute: state.currentRoute.currentRoute
  }
};

export default connect(mapStateToProps)(Header);