import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions';

class HomePageComponent extends Component<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <a onClick={this.signOut}>Sign Out</a>
        <h2>Home Page</h2>
      </div>
    );
  }

  private signOut = () => {
    const { signOutAction } = this.props;

    signOutAction();
  };
}

const mapDispatchToProps = {
  signOutAction: signOut,
};

export const HomePage = connect(
  null,
  mapDispatchToProps
)(HomePageComponent);
