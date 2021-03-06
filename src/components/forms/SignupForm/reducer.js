import axios from 'axios';

export const signup = ({email, password}) => {
  return async(dispatch) => {
    let res = await axios({
      url: `${SHAKEDOWN_URL}/signup`,
      method: 'post',
      data: {email, password},
      withCredentials: true
    });

    let { data: { token } } = res;
    if (!token) throw new Error('Unable to Sign Up')
    dispatch({
      type: 'LOGIN',
      payload: token
    });
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
export default function transferTicketFormReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
