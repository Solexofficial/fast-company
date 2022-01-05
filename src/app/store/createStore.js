import qualitiesReducer from './qualities';
import professionsReducer from './professions';

const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionsReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
