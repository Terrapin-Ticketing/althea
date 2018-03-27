import axios from 'axios';

export const SET_USER_TICKETS = 'SET_USER_TICKETS';

export const getUserTickets = () => {
  return async (dispatch, getState) => {
    let options = {
      url: `${SHAKEDOWN_URL}/tickets/find`,
      method: 'post',
      data: {
        query: {
          ownerId: getState().auth.user._id
        }
      },
      withCredentials: true
    };
    let { data: { tickets } } = await axios(options);
    dispatch({
      type: SET_USER_TICKETS,
      payload: tickets
    });
  };
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_USER_TICKETS]: (state, action) => {
    return {
      ...state,
      tickets: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
