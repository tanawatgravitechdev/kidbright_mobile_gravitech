import {combineReducers, createStore} from 'redux';
import configuration from './configuration';
import sensorDataSerie from './sensorSeries';

const rootReducer = combineReducers({
  config: configuration,
  series: sensorDataSerie
});

const store = createStore(rootReducer);

export default store;
