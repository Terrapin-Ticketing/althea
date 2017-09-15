import axios from 'axios'
import web3 from '../../../components/Web3.js'
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

function decryptPrivateKey() {
  // * SYM DECRYPT *
  //
  // var decipher = crypto.createDecipher(algorithm, key);
  // var deciphered = decipher.update(ciphered, outputEncoding, inputEncoding);
  // deciphered += decipher.final(inputEncoding);
  //
  // console.log(deciphered);
  // assert.equal(deciphered, text, 'Deciphered text does not match!');
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const login = (email, password) => {
  return (dispatch, getState) => {
    return axios({
      url: `${API_URL}/login`,
      method: 'post',
      data: {email, password},
      withCredentials: true
    })
      .then((res) => {
        let { token } = res.data;
        setAuthorizationToken(token);
        console.log('token: ', jwt.decode(token));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: jwt.decode(token)
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_ERROR,
          payload: err
        });
        throw err;
      });
  };
};

export const actions = {
  login
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      user: action.payload
    }
  },
  [LOGIN_ERROR]: (state, action) => {
    return {
      ...state,
      loginError: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    user: null,
    loginError: null
}
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
