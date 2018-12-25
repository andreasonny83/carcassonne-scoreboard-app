import React, { PureComponent } from 'react';
import { SignInData } from '../actions';

interface LoginFormProps {
  loading: boolean;
  toggleLoading(status: boolean): void;
  onLogin(data: SignInData): void;
  onCodeRequired(username: string): void;
}

interface LoginFormState {
  username: string;
  password: string;
}

const initialState: LoginFormState = {
  username: '',
  password: '',
};

export class LoginForm extends PureComponent<LoginFormProps, LoginFormState> {
  public readonly state: LoginFormState = initialState;

  public render(): JSX.Element {
    const { loading } = this.props;
    const { username, password } = this.state;

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
                disabled={loading}
                value={username}
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
                disabled={loading}
                value={password}
                onChange={this.handleChange}
                required={true}
                minLength={6}
              />
            </label>
          </div>

          <div className="form-field">
            <button type="submit" disabled={loading}>
              Log In
            </button>
          </div>
        </form>
      </div>
    );
  }

  public handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const { username, password } = this.state;
    const { onLogin, toggleLoading } = this.props;

    const data = {
      username: username.toString().trim(),
      password: password.toString().trim(),
    };

    event.preventDefault();

    toggleLoading(true);
    onLogin(data);
  };

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event && event.target;
    const name: string = target && target.name;
    const value: string = target && target.value;

    event.preventDefault();

    this.setState(
      (prevState: LoginFormState): LoginFormState => ({
        ...prevState,
        [name]: value,
      })
    );
  };
}
