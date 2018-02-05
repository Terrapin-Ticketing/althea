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
// export const setPassword = (passwordToken, password) => {
//   return async (dispatch, getState) => {
//     // if the password doesn't match the local token use axios to get a new one
//     let res = await axios({
//       url: `${SHAKEDOWN_URL}/set-password/${passwordToken}`,
//       method: 'post',
//       data: {password},
//       withCredentials: true
//     });
//
//     let { token } = res.data;
//     setAuthorizationToken(token);
//
//     let user = jwt.decode(token);
//
//     dispatch({
//       type: 'LOGIN',
//       payload: user
//     });
//   };
// };

export const isValidToken = async(token) => {
  return async (dispatch) => {
    let res = await axios({
      url: `${SHAKEDOWN_URL}/check-token`,
      method: 'post',
      data: {token},
      withCredentials: true
    });

    // dispatch({
    //   type: '',
    //   payload: 's'
    // });
    return res.data.isValidToken;
  };
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
