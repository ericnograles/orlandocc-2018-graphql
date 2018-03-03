import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

export const history = createHistory();

function baselineMiddleware() {
  let router = routerMiddleware(history);
  // Disables redux-logger in prod
  if (
    process.env.REACT_APP_REDUX_DEBUGGING_ENABLED === 'false' ||
    !process.env.REACT_APP_REDUX_DEBUGGING_ENABLED
  ) {
    return applyMiddleware(thunkMiddleware, router);
  }

  return compose(applyMiddleware(thunkMiddleware, router, createLogger()));
}

export default initialState => {
  const enhancers =
    process.env.REACT_APP_REDUX_DEBUGGING_ENABLED === 'true'
      ? composeWithDevTools(baselineMiddleware())
      : baselineMiddleware();
  const store = createStore(rootReducer, initialState, enhancers);
  return store;
};
