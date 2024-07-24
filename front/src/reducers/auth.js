import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOG_OUT,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  SET_USER_ID
} from '../actions';

const initialState = {
  isLoggedIn: false,
  id: null,
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      console.log('Setting User ID:', action.payload); 
      return { ...state, isLoggedIn: true, id: action.payload, loading: false, error: null };
      
    case SIGNIN_REQUEST:
    case DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case SIGNIN_SUCCESS:
      return { ...state, isLoggedIn: true, id: action.payload.id, loading: false, error: null };

    case SIGNIN_FAILURE:
    case DELETE_USER_FAILURE:
      return { ...state, loading: false, error: action.error };

    case LOG_OUT:
      return { ...state, isLoggedIn: false, id: null, loading: false, error: null };

    case DELETE_USER_SUCCESS:
      return { ...state, isLoggedIn: false, id: null, loading: false, error: null };

    default:
      return state;
  }
};

export default authReducer;



