import { createStore, applyMiddleware } from 'redux';
// Bring in persistStore (localStorage)
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root-reducer';

// Saga
import rootSage from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// Stop using logger on Heroku
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Run the saga middleware
sagaMiddleware.run(rootSage);

export const persistor = persistStore(store);
