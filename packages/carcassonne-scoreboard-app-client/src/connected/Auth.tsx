import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn } from '../actions';
import { AuthComponent, CodeConfirmationForm } from '../components';

interface AuthState {
  email?: string;
}

interface AuthProps {
  logIn(): any;
}

const initialState: Partial<AuthState> = {};

class Auth extends Component<any, AuthState> {
  public readonly state: AuthState = initialState;

  public render() {
    const { email } = this.state;

    return (
      (email && <CodeConfirmationForm email={email} undo={this.handleUndo} onConfirmed={this.handleUndo} />) || (
        <AuthComponent
          onRegistration={this.handleRegistration}
          onCodeRequired={this.handleRegistration}
          onLogin={this.props.signIn}
        />
      )
    );
  }

  private handleUndo = () => {
    this.setState((currentState: AuthState) => ({
      ...currentState,
      email: undefined,
    }));
  };

  private handleRegistration = (email: string) => {
    this.setState((currentState: AuthState) => ({
      ...currentState,
      email,
    }));
  };
}

const mapStateToProps = (state: any) => ({
  registration: state.registration,
});

const mapDispatchToProps = {
  signIn
};

export const AuthPage = connect(mapStateToProps, mapDispatchToProps)(Auth);
