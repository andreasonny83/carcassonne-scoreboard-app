import React, { PureComponent } from 'react';

import { RegistrationForm } from './RegistrationForm';
import { LoginForm } from './LoginForm';

interface LoginComponentProps {
  onLogin: (email: string) => void;
  onCodeRequired: (email: string) => void;
  onRegistration: (email: string) => void;
}

export class LoginComponent extends PureComponent<LoginComponentProps, {}> {
  public render() {
    const { onRegistration, onLogin, onCodeRequired } = this.props;
    return (
      <>
        <LoginForm onLogin={onLogin} onCodeRequired={onCodeRequired} />
        <RegistrationForm onRegistration={onRegistration} />
      </>
    );
  }
}
