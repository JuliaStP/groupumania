// import { takeEvery, call, put } from "redux-saga/effects";
// import { serverSignup } from "../api";
// import { SIGNUP_SUCCESS, signIn } from "../actions";

// export function* signingupSaga(action) {
//   const { email, firstName, lastName, password } = action.payload;
//   const success = yield call(
//     serverSignup,
//     email,
//     firstName,
//     lastName,
//     password
//   );
//   if (success) {
//     yield put(signIn());
//   }
// }

// export function* signupSaga() {
//   yield takeEvery(SIGNUP_SUCCESS, signingupSaga);
// }