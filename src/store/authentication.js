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

function getCookie(name) {
  let nameEQ = name + '=';
  let ca = document.cookie.split(';');
  for (let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setCookieFromToken(token) {
  setAuthorizationToken(token);

  // set cookie
  setCookie('cookieToken', token, 2);
  // let cookieToken = getCookie('cookieToken');
  // if (!cookieToken) {
  // }
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

    let { token } = res.data;
    setCookieFromToken(token);

    let user = jwt.decode(token);

    dispatch({
      type: 'LOGIN',
      payload: user
    });
  };
};

export const signup = (email, password) => {
  return async(dispatch) => {
    let res = await axios({
      url: `${SHAKEDOWN_URL}/signup`,
      method: 'post',
      data: {email, password},
      withCredentials: true
    });

    let { token } = res.data;
    setCookieFromToken(token);

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

    // locationModules.clearRedirectUrl();

    let { token } = res.data;
    setCookieFromToken(token);

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

// export const actions = {
//   signup, login
// };

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
    console.log('logging out');
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
