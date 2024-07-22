import { configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { thunk } from 'redux-thunk'; // Correct import for redux-thunk
import createSagaMiddleware from 'redux-saga';
import { authSaga } from './sagas/authSaga';
import { signupSaga } from './sagas/signupSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// sagaMiddleware.run(authSaga);
// sagaMiddleware.run(signupSaga);

export default store;