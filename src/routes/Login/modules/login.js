import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';

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

    console.log('setting user', user);

    dispatch({
      type: 'LOGIN',
      payload: user
    });

    dispatch({
      type: 'UNLOCK_PK',
      payload: {
        encryptedPrivateKey: user.encryptedPrivateKey,
        password
      }
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
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { };
export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
