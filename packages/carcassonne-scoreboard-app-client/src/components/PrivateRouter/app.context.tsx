import React, { PureComponent } from 'react';

export interface IUser {
  username: string;
  email: string;
  nickname: string;
  avatar?: string;
}

export interface IAppContext {
  user: IUser;
}

export const AppContext = React.createContext<IAppContext>({} as IAppContext);

export class AppContextProvider extends PureComponent<any> {
  public render() {
    const { children, value } = this.props;

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  }
}
