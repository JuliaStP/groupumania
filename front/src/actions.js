import { serverSignup, serverLogin, createPost, serverDeleteUser } from './api';

export const LOG_OUT = 'LOG_OUT';
export const SET_USER_ID = 'SET_USER_ID ';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const POST_REQUEST = 'POST_REQUEST';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAILURE = 'POST_FAILURE';

export const setUserId = (id) => ({
  type: 'SET_USER_ID',
  payload: id,
});

export const deleteUser = (id) => {
  return async (dispatch) => {
    console.log('Action Delete User ID:', id);  

    dispatch({ type: DELETE_USER_REQUEST });

    try {
      const success = await serverDeleteUser(id);
      if (success) {
        localStorage.removeItem('token');
        dispatch({ type: DELETE_USER_SUCCESS });
        return true;
      } else {
        dispatch({ type: DELETE_USER_FAILURE, error: 'Delete failed' });
        return false;
      }
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAILURE,
        error: error.message || 'An unknown error occurred',
      });
      return false;
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch({ type: LOG_OUT });
  };
};

// export const signUp = (email, firstName, lastName, password) => {
//   return async (dispatch) => {
//     dispatch({ type: SIGNUP_REQUEST });

//     try {
//       const response = await serverSignup(email, firstName, lastName, password);
//       if (response.success) {
//         dispatch({ type: SIGNUP_SUCCESS, payload: { id: response.id } });
//         return true;
//       } else {
//         dispatch({ type: SIGNUP_FAILURE, error: response.message });
//         return false;
//       }
//     } catch (error) {
//       dispatch({ type: SIGNUP_FAILURE, error: error.message || 'An unknown error occurred' });
//       return false;
//     }
//   };
// };

export const signUp = (email, firstName, lastName, password) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });

    try {
      const response = await serverSignup(email, firstName, lastName, password);
      if (response.success) {
        localStorage.setItem('id', response.id);
        localStorage.setItem('token', response.token);
        dispatch(setUserId(response.id));
        dispatch({ type: SIGNUP_SUCCESS, payload: { id: response.id } });
        return true;
      } else {
        dispatch({ type: SIGNUP_FAILURE, error: response.message });
        return false;
      }
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, error: error.message || 'An unknown error occurred' });
      return false;
    }
  };
};


export const signIn = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: SIGNIN_REQUEST });

    try {
      const response = await serverLogin(email, password);
      if (response.success) {
        dispatch(setUserId(response.id));
        localStorage.setItem('token', response.token);
        localStorage.setItem('id', response.id);
        dispatch({ type: SIGNIN_SUCCESS, payload: { id: response.id } });
      } else {
        dispatch({ type: SIGNIN_FAILURE, error: response.message });
      }
      return response.success;  
    } catch (error) {
      dispatch({ type: SIGNIN_FAILURE, error: error.message || 'An unknown error occurred' });
      return false;  
    }
  };
};

export const writePost = (title, content, author) => {
  return async (dispatch) => {
    dispatch({ type: POST_REQUEST });

    try {
      const success = await createPost(title, content, author);
      if (success) {
        dispatch({ type: POST_SUCCESS });
      } else {
        dispatch({ type: POST_FAILURE, error: 'Posting failed' });
      }
    } catch (error) {
      dispatch({
        type: POST_FAILURE,
        error: error.message || 'An unknown error occurred',
      });
    }
  };
};
