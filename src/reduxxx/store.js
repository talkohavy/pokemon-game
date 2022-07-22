// Redux stuff:
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import { gameMdlwrs } from './game/middlewares';
import { modalsMdlwrs } from './modals/middlewares';
import { fetchApi } from './api/middlewares';
import rootReducer from './rootReducer';

const myLogger = createLogger();
const allMiddlewares = [...gameMdlwrs, ...modalsMdlwrs, fetchApi, myLogger];

export function createMyStore(initialState = {}) {
  // A. create the store
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...allMiddlewares))
  );

  // B. return store + history
  return store;
}
