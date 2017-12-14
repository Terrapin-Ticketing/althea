import pasync from 'pasync';
import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_TICKET_DETAILS = 'SET_TICKET_DETAILS';
export const SET_EVENT_DETAILS = 'SET_EVENT_DETAILS';
export const UPDATE_ORDER = 'UPDATE_ORDER';

export function getEventInfo() {
  return async (dispatch, getState) => {

  };
}

export function getTicketInfo(ticketId) {
  return async (dispatch, getState) => {

    // dispatch({
    //   type: SET_TICKET_DETAILS,
    //   payload: ticket
    // });
  };
}

export const sellTicket = (ticket) => {
  return async (dispatch, getState) => {

  };
};

export const transferTicket = (ticketId, recipientAddress) => {
  return async (dispatch, getState) => {

  };
};

export const actions = {
  getTicketInfo,
  getEventInfo,
  sellTicket,
  transferTicket
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_TICKET_DETAILS]: (state, action) => {
    return {
      ...state,
      ticket: action.payload
    };
  },
  [SET_EVENT_DETAILS]: (state, action) => {
    return {
      ...state,
      currentEvent: {
        ...state.currentEvent,
        ...action.payload
      }
    };
  },
  [UPDATE_ORDER]: (state, action) => {
    return {
      ...state,
      order: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  ticket: {},
  currentEvent: {}
};

export default function eventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
