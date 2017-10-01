import cookie from 'cookie';
import setAuthorizationToken from '../utils/setAuthorizationToken';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER_BALANCE = 'SET_USER_BALANCE';
export const CACHE_PK = 'CACHE_PK';
export const UNCACHE_PK = 'UNCACHE_PK';

// ------------------------------------
// Actions
// ------------------------------------
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  // document.cookie = name + '=; expires=' + new Date();
}

function clearPK() {
  return (dispatch) => {
    dispatch({
      type: UNCACHE_PK
    });
  };
}

export const actions = {
  clearPK
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
  [CACHE_PK]: (state, action) => {
    let user = {
      ...state.user,
      privateKey: action.payload
    };
    return {
      ...state,
      user
    };
  },
  [UNCACHE_PK]: (state) => {
    let user = {
      ...state.user,
      privateKey: null
    };
    return {
      ...state,
      user
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
      user: null
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
