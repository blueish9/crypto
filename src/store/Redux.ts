import { dispatcherMiddleware } from 'redux-dispatcher';
import { createCMCClient } from '../client/CMCClient';
import { createRootReducer } from './rootReducer';
import { applyMiddleware, legacy_createStore as createStore, Store } from 'redux';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';

export const configRedux = () => {
  const client = createCMCClient();

  const sagaMiddleware = createSagaMiddleware({
    context: { client },
  });

  const middlewares = [sagaMiddleware, dispatcherMiddleware];

  if (__DEV__) {
    const logger = createLogger({});
    middlewares.push(logger);
  }

  const store = createStore(createRootReducer(), applyMiddleware(...middlewares));
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
