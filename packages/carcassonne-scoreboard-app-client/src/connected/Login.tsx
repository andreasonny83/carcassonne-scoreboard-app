import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { LoginComponent, CodeConfirmationForm } from '../components';

interface LogInState {
  email?: string;
}

const initialState: LogInState = {};

class LogIn extends PureComponent {
  public readonly state: LogInState = initialState;

  public render() {
    const { email } = this.state;

    return (
      (email && <CodeConfirmationForm email={email} undo={this.handleUndo} />) || (
        <LoginComponent
          onRegistration={this.handleRegistration}
          onCodeRequired={this.handleRegistration}
          onLogin={this.handleLogin}
        />
      )
    );
  }

  private handleUndo = () => {
    this.setState((currentState: LogInState) => ({
      ...currentState,
      email: undefined,
    }));
  };

  private handleLogin = (email: string) => {
    console.log('email received', email);
  };

  private handleRegistration = (email: string) => {
    this.setState((currentState: LogInState) => ({
      ...currentState,
      email,
    }));
  };
}

const mapStateToProps = (state: any) => ({
  registration: state.registration,
});

// const mapDispatchToProps = dispatch => ({})

const LogInConnected = connect(mapStateToProps)(LogIn);
export { LogInConnected as LogIn }
