import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
const authModules = require('../../../store/authentication').actions;
const locationModules = require('../../../store/location').actions;

// ------------------------------------
// Constants
// ------------------------------------

export const ERROR = 'ERROR';

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export const sendForgotPasswordEmail = (email) => {
  return async (dispatch, getState) => {
    // if the password doesn't match the local token use axios to get a new one
    try {
      let res = await axios({
        url: `${SHAKEDOWN_URL}/set-password`,
        method: 'post',
        data: { email },
        withCredentials: true
      });
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err
      });
    }
  };
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ERROR]: (state, action) => {
    return {
      ...state,
      error: action.payload
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { };
export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
