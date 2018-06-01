import axios from 'axios';
import moment from 'moment';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_EVENT_DETAILS = 'SET_EVENT_DETAILS';
export const SET_AVAILABLE_TICKETS = 'SET_AVAILABLE_TICKETS';

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export function getAvailableTickets(event) {
  return async (dispatch, getState) => {
    let options = {
      url: `${SHAKEDOWN_URL}/tickets/available?isForSale=true&eventId=${event._id}`,
      method: 'get',
      json: true,
      withCredentials: true
    };

    let { data } = await axios(options);
    dispatch({
      type: SET_AVAILABLE_TICKETS,
      payload: data.tickets
    });
  };
}

export function getEventInfo(urlSafeName) {
  return async (dispatch, getState) => {
    let options = {
      url: `${SHAKEDOWN_URL}/events?urlSafe=${urlSafeName}`,
      method: 'get',
      json: true,
      withCredentials: true
    };

    let { data: { events } } = await axios(options);
    dispatch({
      type: SET_EVENT_DETAILS,
      payload: events[0]
    });
  };
}

export const actions = {
  getEventInfo,
  getAvailableTickets
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
  [SET_AVAILABLE_TICKETS]: (state, action) => {
    return {
      ...state,
      availableTickets: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  event: {},
  availableTickets: []
};

export default function availableTicketsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
