import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------

export const SET_EVENT_DETAILS = 'SET_EVENT_DETAILS';

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export function getEventInfo(urlSafeName) {
  return async (dispatch, getState) => {
    let { data: { events } } = await axios(`${SHAKEDOWN_URL}/events/find`,
      { method: 'post', withCredentials: true,
        data: { query: { urlSafe: urlSafeName }}});
        console.log('events: ', events);
    dispatch({
      type: SET_EVENT_DETAILS,
      payload: events[0]
    });
  };
}

export function activateTicket(email, ticketNumber, orderNumber) {
  return async(dispatch, getState) => {
    // TODO: This doesn't work
    // let { data: { registeredTicket } } = await axios(`${SHAKEDOWN_URL}/urlsafe/register-ticket`,
  };
}

export const actions = {
  getEventInfo,
  activateTicket
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_EVENT_DETAILS]: (state, action) => {
    return {
      ...state,
      event: action.payload
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  event: {}
};
export default function activateReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
