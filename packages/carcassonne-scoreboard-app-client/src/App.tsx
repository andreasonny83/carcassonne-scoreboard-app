import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';

import { configureStore } from './configureStore';
import { routes } from './routes';

import './App.css';

// Create redux store with history
const history: History = createBrowserHistory();
const store = configureStore(history);

export class App extends Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">{routes}</div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
