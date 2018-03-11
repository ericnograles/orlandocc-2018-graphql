import { combineReducers } from 'redux';
import { profile } from './profile';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  profile,
  routing
});

export default rootReducer;
