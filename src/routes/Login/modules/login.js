import axios from 'axios';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';

// ------------------------------------
// Constants
// ------------------------------------
let decryptPrivateKey = (key, ciphered) => {
  let algorithm = 'aes256';
  let inputEncoding = 'utf8';
  let outputEncoding = 'hex';

  let decipher = crypto.createDecipher(algorithm, key);
  let deciphered = decipher.update(ciphered, outputEncoding, inputEncoding);
  deciphered += decipher.final(inputEncoding);
  return deciphered;
};

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

    let privateKey = decryptPrivateKey(password, user.encryptedPrivateKey).substring(2);
    privateKey = Buffer.from(privateKey, 'hex');
    dispatch({
      type: 'CACHE_PK',
      payload: privateKey
    });

    //
    // await new Promise((resolve) => {
    //   console.log('doing it');
    //   dispatch({
    //     type: 'LOGIN',
    //     payload: user
    //   }, () => {
    //     console.log('returned');
    //     resolve();
    //   });
    // });
    //
    // console.log('here');
    //
    // await new Promise((resolve) => {
    //   let privateKey = decryptPrivateKey(password, user.encryptedPrivateKey).substring(2);
    //   privateKey = Buffer.from(privateKey, 'hex');
    //   dispatch({
    //     type: 'CACHE_PK',
    //     payload: privateKey
    //   }, resolve);
    // });
    //
    // console.log('here');

    //
    // return axios({
    //   url: `${API_URL}/login`,
    //   method: 'post',
    //   data: {email, password},
    //   withCredentials: true
    // })
    //   .then((res) => {
    //     let { token } = res.data;
    //     let user = jwt.decode(token);
    //     setAuthorizationToken(token);
    //     dispatch({
    //       type: 'LOGIN',
    //       payload: user
    //     });
    //
    //     let privateKey = decryptPrivateKey(password, user.encryptedPrivateKey).substring(2);
    //     privateKey = Buffer.from(privateKey, 'hex');
    //     dispatch({
    //       type: 'CACHE_PK',
    //       payload: privateKey
    //     });
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  };
};

export const actions = {
  login
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
