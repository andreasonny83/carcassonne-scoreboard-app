import { createStore, applyMiddleware, compose, StoreEnhancer, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import { createRootReducer } from './reducers';
import { AuthState } from './reducers/auth';

interface AppStore {
  auth?: AuthState
}

const initialState: AppStore = {};

export const configureStore = (browserHistory: any): Store<AppStore> => {
  const middlewares = [thunk, routerMiddleware(browserHistory)];

  const enhancers: StoreEnhancer[] = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  return createStore(
    createRootReducer(browserHistory),
    initialState,
    composeEnhancers(...enhancers)
  );
};
