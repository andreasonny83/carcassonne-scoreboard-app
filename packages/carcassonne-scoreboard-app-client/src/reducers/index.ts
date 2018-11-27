import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { cognito } from 'react-cognito';

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    cognito
  });
