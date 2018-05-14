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

function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function setCookieFromToken(token) {
  setAuthorizationToken(token);
  setCookie('cookieToken', token, 2);
}

// ------------------------------------
// Actions
// ------------------------------------
export const setPassword = (passwordToken, password) => {
  return async (dispatch, getState) => {
    // if the password doesn't match the local token use axios to get a new one
    let res = await axios({
      url: `${SHAKEDOWN_URL}/set-password/${passwordToken}`,
      method: 'post',
      data: {password},
      withCredentials: true
    });

    let { data: { token } } = res;

    dispatch({
      type: 'LOGIN',
      payload: token
    });
  };
};

// export const actions = {
//   signup, login
// };

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN]: (state, action) => {
    setCookieFromToken(action.payload);
    let user = jwt.decode(action.payload);
    return {
      ...state,
      user: user
    };
  },
  [SET_USER_INFO]: (state, action) => {
    return {
      ...state,
      user: action.payload
    };
  },
  [LOGOUT]: (state, action) => {
    const parsedCookie = cookie.parse(document.cookie);
    if (parsedCookie.cookieToken) {
      deleteCookie('cookieToken');
      setAuthorizationToken();
    }
    return {
      ...state,
      user: null
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
