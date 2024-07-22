import { combineReducers } from "redux";
import authReducer from './auth';

const rootReducer = combineReducers({
    auth: authReducer,
    // other reducers if any
  });
  
  export default rootReducer;