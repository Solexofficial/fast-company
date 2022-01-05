import qualitiesReducer from './qualities';
import professionsReducer from './professions';
import usersReducer from './users';

const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionsReducer,
  users: usersReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
