import axios from 'axios'
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';

// ------------------------------------
// Constants
// ------------------------------------
/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const signup = (email, password) => {
  return (dispatch, getState) => {
    return axios({
      url: `${API_URL}/signup`,
      method: 'post',
      data: {email, password},
      withCredentials: true
    })
      .then((res) => {
        let { token } = res.data;
        setAuthorizationToken(token);
        return dispatch({
          type: 'LOGIN', // don't know why SIGNUP_SUCCESS doesnt work
          payload: jwt.decode(token)
        });
      })
      .catch((err) => {
        throw err;
      });
  }
}

export const actions = {
  signup
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};

export default function signupReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
