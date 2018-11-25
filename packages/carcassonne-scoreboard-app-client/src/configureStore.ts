import { createStore, applyMiddleware, compose, StoreEnhancer } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createRootReducer } from './reducers';

const history = createBrowserHistory();

export const configureStore = (initialState = {}) => {
  const middlewares = [thunk, routerMiddleware(history)];

  const enhancers: StoreEnhancer[] = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  return createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(...enhancers)
  );
};
