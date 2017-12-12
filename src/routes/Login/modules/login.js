import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
const authModules = require('../../../store/authentication').actions;
const locationModules = require('../../../store/location').actions;

// ------------------------------------
// Constants
// ------------------------------------


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export const login = (email, password) => {
  return async (dispatch, getState) => {
    // if the password doesn't match the local token use axios to get a new one
    let res = await axios({
      url: `${SHAKEDOWN_URL}/login`,
      method: 'post',
      data: {email, password},
      withCredentials: true
    });

    let { token } = res.data;
    setAuthorizationToken(token);

    let user = jwt.decode(token);

    dispatch({
      type: 'LOGIN',
      payload: user
    });

    locationModules.clearRedirectUrl();
  };
};

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
    let user = jwt.decode(token);
    dispatch({
      type: 'LOGIN',
      payload: user
    });
  };
};

export const actions = {
  login,
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
const initialState = { };
export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
