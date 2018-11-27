import React, { PureComponent } from 'react';
import axios from 'axios';
// const API_URL = 'https://andreasonny83.ngrok.io';
const API_URL = 'http://localhost:8888';

interface LoginFormState {
  username: string;
  password: string;
  busy: boolean;
}

interface LoginFormProps {
  onLogin: (email: string) => void;
  onCodeRequired: (email: string) => void;
}

const initialState: LoginFormState = {
  username: '',
  password: '',
  busy: false,
};

export class LoginForm extends PureComponent<
  LoginFormProps,
  LoginFormState
> {
  public readonly state: LoginFormState = initialState;

  public render() {
    return (
      <div className="LoginForm">
      <h2>Login</h2>

      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Enter username
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

        <div>
          <label>
            Enter password
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

        <button type="submit" disabled={this.state.busy}>
          Log In
        </button>
      </form>
      </div>
    );
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = this.state;

    const data: Partial<LoginFormState> = {
      username: username.toString().trim(),
      password: password.toString().trim(),
    };

    // this.toggleBusy(false);
    // this.props.onLogin(username);

    this.toggleBusy(true);

    axios(`${API_URL}/login`, {
      method: 'POST',
      data,
    })
      .then((res) => {
        this.toggleBusy(false);

        if (res.status === 223) {
          return this.props.onCodeRequired(username);
        }

        this.props.onLogin(username);
      })
      .catch((err) => {
        console.log('request failed', err);

        this.toggleBusy(false);
      });
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

  private toggleBusy(state: boolean): void {
    this.setState(
      (prevState: LoginFormState): LoginFormState => ({
        ...prevState,
        busy: state,
      })
    );
  }
}
