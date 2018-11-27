import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends Component {
  public render() {
    return (
      <div>
        <Link to="/login">Logout</Link>
        <h2>Home Page</h2>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { users, authentication } = state;
  const { user } = authentication;

  return {
    user,
    users,
  };
};

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
