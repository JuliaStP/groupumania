// import { takeEvery, call, put } from "redux-saga/effects";
// import { serverLogin } from "../api";
// import { SIGNIN_SUCCESS, signIn } from "../actions";

// export function* authenticateSaga(action) {
//   const { email, password } = action.payload;
//   const success = yield call(serverLogin, email, password);
//   if (success) {
//     yield put(signIn());
//   }
// }

// export function* authSaga() {
//   yield takeEvery(SIGNIN_SUCCESS, authenticateSaga);
// }