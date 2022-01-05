const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
