import React, { Component } from 'react';
import Auth from '@aws-amplify/auth';

interface LoginFormState {
  username: string;
  password: string;
  busy: boolean;
}

interface LoginFormProps {
  onLogin: () => void;
  onCodeRequired: (email: string) => void;
}

const initialState: LoginFormState = {
  username: '',
  password: '',
  busy: false,
};

export class LoginForm extends Component<LoginFormProps, LoginFormState> {
  public readonly state: LoginFormState = initialState;

  public render() {
    return (
      <div className="LoginForm">
        <h2>Login</h2>

        <form onSubmit={this.handleSubmit}>
          <div className="form-field">
            <label>
              Email
              <input
                name="username"
                type="email"
                disabled={this.state.busy}
                value={this.state.username}
                onChange={this.handleChange}
                required={true}
                minLength={6}
              />
            </label>
          </div>

          <div className="form-field">
            <label>
              Password
              <input
                name="password"
                type="password"
                disabled={this.state.busy}
                value={this.state.password}
                onChange={this.handleChange}
                required={true}
                minLength={6}
              />
            </label>
          </div>

          <div className="form-field">
            <button type="submit" disabled={this.state.busy}>
              Log In
            </button>
          </div>
        </form>
      </div>
    );
  }

  public handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const { username, password } = this.state;
    event.preventDefault();

    const data = {
      username: username.toString().trim(),
      password: password.toString().trim(),
    };

    let authStatus;
    this.toggleBusy(true);

    try {
      authStatus = await Auth.signIn(data.username, data.password);
    } catch (err) {
      this.handleError(err, username);
      return;
    } finally {
      this.toggleBusy(false);
    }

    if (authStatus.username) {
      return this.props.onLogin();
    }
  };

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event && event.target;
    const name: string = target && target.name;
    const value: string = target && target.value;

    this.setState(
      (prevState: LoginFormState): LoginFormState => ({
        ...prevState,
        [name]: value,
      })
    );

    event.preventDefault();
  };

  private handleError(err: AmplifyErrorResponse, username: string) {
    if (err.code === 'UserNotConfirmedException') {
      return this.props.onCodeRequired(username);
    }

    console.error(err.message || err);
  }

  private toggleBusy(state: boolean): void {
    this.setState(
      (prevState: LoginFormState): LoginFormState => ({
        ...prevState,
        busy: state,
      })
    );
  }
}
