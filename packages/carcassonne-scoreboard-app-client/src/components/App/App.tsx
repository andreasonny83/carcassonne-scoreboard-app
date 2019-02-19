import Amplify, { Auth } from 'aws-amplify';
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AMPLIFY, API_URL } from '../../config';
import { configureStore } from '../../configureStore';
import { AppComponent } from './AppComponent';

Amplify.configure(AMPLIFY);

// Create redux store with history
const history: History = createBrowserHistory();
const store = configureStore(history);

const httpLink = createHttpLink({
  uri: `${API_URL}/graph`,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const session = await Auth.currentSession();
  const token = session.accessToken.jwtToken;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export class App extends PureComponent {
  public render(): JSX.Element {
    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <AppComponent />
          </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}
