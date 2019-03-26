import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const logger = createLogger({});

const initializeStore = (initialState = {}) => {
  return createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware, logger));
}

export default initializeStore;