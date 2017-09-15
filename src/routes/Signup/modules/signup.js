import axios from 'axios'
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';

// ------------------------------------
// Constants
// ------------------------------------
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const signup = (email, password) => {
  return (dispatch, getState) => {
    return axios.post(`${API_URL}/signup`, {email, password})
      .then((res) => {
        let { token } = res.data;
        setAuthorizationToken(token);
        dispatch({
          type: 'LOGIN_SUCCESS', // don't know why SIGNUP_SUCCESS doesnt work
          payload: jwt.decode(token)
        });
      })
      .catch((err) => {
        dispatch({
          type: SIGNUP_ERROR,
          payload: err
        });
        throw err;
      });
  }
}

export const actions = {
  signup
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIGNUP_SUCCESS]: (state, action) => {
    console.log('SIGNUP_SUCCESS: ', action);
    return {
      ...state,
      user: action.payload
    };
  },
  [SIGNUP_ERROR]: (state, action) => {
    return {
      ...state,
      signupError: action.payload
    };
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    user: null,
    signupError: null
}
export default function signupReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
