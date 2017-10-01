import axios from 'axios'
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';

// ------------------------------------
// Constants
// ------------------------------------
/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const signup = (email, password, privateKey) => {
  return async(dispatch, getState) => {
    let res = await axios({
      url: `${SHAKEDOWN_URL}/signup`,
      method: 'post',
      data: {email, password, privateKey},
      withCredentials: true
    });

    let { token } = res.data;
    setAuthorizationToken(token);
    return dispatch({
      type: 'LOGIN', // don't know why SIGNUP_SUCCESS doesnt work
      payload: jwt.decode(token)
    });
  };
};

export const actions = {
  signup
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};

export default function signupReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
