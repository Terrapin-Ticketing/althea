import cookie from 'cookie';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import crypto from 'crypto';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER_BALANCE = 'SET_USER_BALANCE';
export const UNLOCK_PK = 'UNLOCK_PK';
export const CLEAR_PK = 'CLEAR_PK';

let decryptPrivateKey = (key, ciphered) => {
  let algorithm = 'aes256';
  let inputEncoding = 'utf8';
  let outputEncoding = 'hex';

  let decipher = crypto.createDecipher(algorithm, key);
  let deciphered = decipher.update(ciphered, outputEncoding, inputEncoding);
  deciphered += decipher.final(inputEncoding);
  return deciphered;
};

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  // document.cookie = name + '=; expires=' + new Date();
}

// ------------------------------------
// Actions
// ------------------------------------
export function clearPK() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_PK
    });
  };
}

export function unlockPK(password) {
  return (dispatch, getState) => {
    let { user } = getState().auth;
    dispatch({
      type: UNLOCK_PK,
      payload: {
        password,
        encryptedPrivateKey: user.encryptedPrivateKey
      }
    });
  };
}

export const actions = {
  clearPK, unlockPK
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
  [UNLOCK_PK]: (state, action) => {
    let { password, encryptedPrivateKey } = action.payload;
    let privateKey = decryptPrivateKey(password, encryptedPrivateKey).substring(2);
    privateKey = Buffer.from(privateKey, 'hex');
    let user = {
      ...state.user,
      privateKey
    };
    return {
      ...state,
      user
    };
  },
  [CLEAR_PK]: (state) => {
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
