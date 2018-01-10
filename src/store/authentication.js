import axios from 'axios';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';


// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN';
export const SET_USER_INFO = 'SET_USER_INFO';
export const LOGOUT = 'LOGOUT';

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  // document.cookie = name + '=; expires=' + new Date();
}

// ------------------------------------
// Actions
// ------------------------------------

export const signup = (email, password, privateKey) => {
  return async(dispatch) => {
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

export const login = (email, password) => {
  return async (dispatch) => {
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

    dispatch({
      type: 'CLEAR_REDIRECT_URL',
      payload: null
    });
  };
};

export const actions = {
  signup, login
};

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN]: (state, action) => {
    return {
      ...state,
      user: action.payload
    };
  },
  [SET_USER_INFO]: (state, action) => {
    return {
      ...state,
      user: action.payload
    };
  },
  [LOGOUT]: (state) => {
    const parsedCookie = cookie.parse(document.cookie);
    if (parsedCookie.cookieToken) {
      deleteCookie('cookieToken');
      setAuthorizationToken();
    }
    return {
      ...state,
      user: null,
      balance: null
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  user: null
};

export default function authenticationReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
