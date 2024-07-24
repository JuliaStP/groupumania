import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./reducers";
import { thunk } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;