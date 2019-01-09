import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { SignInData } from '../../actions';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';
import { CodeConfirmationForm } from './CodeConfirmationForm';
import './Auth.css';

interface AuthProps {
  email?: string | null;
  showCodeConfirmation?: boolean;
  auth: any;
  signIn(data: SignInData): void;
  toggleLoading(status: boolean): void;
  verifyUser(email: string): void;
  undoCodeVerification(): void;
  codeVerified(): void;
}

export class AuthComponent extends PureComponent<AuthProps> {
  public componentDidMount() {
    const { toggleLoading } = this.props;

    toggleLoading(false);
  }

  public render(): JSX.Element {
    const { signIn, auth, undoCodeVerification, codeVerified, toggleLoading, verifyUser } = this.props;
    const { showCodeConfirmation, email, isSignedIn, loading } = auth;

    return (
      (isSignedIn && <Redirect to="/" />) || (
        <div className="Auth">
          {(showCodeConfirmation && email && (
            <CodeConfirmationForm
              email={email}
              undo={undoCodeVerification}
              onConfirmed={codeVerified}
              toggleLoading={toggleLoading}
              loading={loading}
            />
          )) || (
            <>
              <LoginForm
                onLogin={signIn}
                onCodeRequired={verifyUser}
                loading={loading}
                toggleLoading={toggleLoading}
              />
              <RegistrationForm onRegistration={this.handleRegistration} />
            </>
          )}
        </div>
      )
    );
  }

  private handleRegistration = () => {
    console.log('user registered');
  };
}
