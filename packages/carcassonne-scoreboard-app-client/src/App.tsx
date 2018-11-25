import React, { Component, PureComponent } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';

import { configureStore } from './configureStore';
import { routes } from './routes';
import './App.css';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState);
const history: History = createBrowserHistory();

export class App extends Component<{}, {}> {
  public render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <header className="App-header">{routes}</header>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
