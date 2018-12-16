import React, { Component } from 'react';

import { RegistrationForm } from './RegistrationForm';
import { LoginForm } from './LoginForm';

import './Auth.css';

interface AuthComponentProps {
  onLogin: () => void;
  onCodeRequired: (email: string) => void;
  onRegistration: (email: string) => void;
}

export class AuthComponent extends Component<AuthComponentProps, {}> {
  public render() {
    const { onRegistration, onLogin, onCodeRequired } = this.props;
    return (
      <div className="Auth">
        <LoginForm onLogin={onLogin} onCodeRequired={onCodeRequired} />
        <RegistrationForm onRegistration={onRegistration} />
      </div>
    );
  }
}
