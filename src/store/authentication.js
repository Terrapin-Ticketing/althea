import cookie from 'cookie';
import setAuthorizationToken from '../utils/setAuthorizationToken';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

// ------------------------------------
// Actions
// ------------------------------------
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  // document.cookie = name + '=; expires=' + new Date();
}

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
  [LOGOUT]: (state, action) => {
    const parsedCookie = cookie.parse(document.cookie);
    if (parsedCookie.cookieToken) {
      deleteCookie('cookieToken');
      setAuthorizationToken();
    }
    return {
      ...state,
      user: action.payload
    };
  },
  [SET_USER_BALANCE]: (state, action) => {
    return {
      ...state,
      balance: action.payload
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
