import Amplify, { Auth } from 'aws-amplify';
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';

import { theme } from '../../theme';
import { AMPLIFY, API_URL, APP_NAME } from '../../config';
import { configureStore } from '../../configureStore';
import { AppWithStyles } from './AppWithStyles';

Amplify.configure(AMPLIFY);

// Create redux store with history
const history: History = createBrowserHistory();
const store = configureStore(history);

const httpUri = API_URL + '/graphql';
const wsUri = httpUri.replace(/^https?/, 'ws');

const httpLink = createHttpLink({
  uri: httpUri,
});

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true,
  },
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

const terminatingLink = split(
  // split based on operation type
  ({ query }) => {
    const response = getMainDefinition(query);
    return response.kind === 'OperationDefinition' && response.operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink)
);

const link = ApolloLink.from([terminatingLink]);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export class App extends PureComponent {
  public render(): JSX.Element {
    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <AppWithStyles appName={APP_NAME} />
            </MuiThemeProvider>
          </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}
