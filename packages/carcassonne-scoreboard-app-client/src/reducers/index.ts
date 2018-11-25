import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
// import { registerReducer } from './register';
import { History } from 'history';

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    // register: registerReducer
  });
