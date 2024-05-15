import {combineReducers, createStore} from 'redux';
import configuration from './configuration';

const rootReducer = combineReducers({
  config: configuration,
});

const store = createStore(rootReducer);

export default store;
