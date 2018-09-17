import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_TICKETS = 'SET_TICKETS';

export function getTickets(id) {
  return async (dispatch, getState) => {
    let res = await axios({
      url: `${SHAKEDOWN_URL}/tickets?eventId=${id}`,
      method: 'get',
      json: true,
      withCredentials: true
    });
    let { data } = res;
    console.log('data: ', data);
    dispatch({
      type: SET_TICKETS,
      payload: data.tickets
    });
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_TICKETS]: (state, action) => {
    return {
      ...state,
      tickets: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  tickets: []
};

export default function ticketsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
