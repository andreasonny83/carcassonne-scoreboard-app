import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { notificationsReducer } from './notifications';
import { authReducer } from './auth';

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    notifications: notificationsReducer,
  });
