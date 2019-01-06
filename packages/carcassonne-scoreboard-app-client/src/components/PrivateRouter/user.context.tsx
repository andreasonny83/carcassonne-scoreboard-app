import React, { PureComponent } from 'react';

export interface IUser {
  username: string;
  email: string;
  nickname: string;
}

export const UserContext = React.createContext<IUser>({} as IUser);

export class UserContextProvider extends PureComponent<any> {
  public render() {
    const { children, value } = this.props;

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  }
}
