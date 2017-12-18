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
    console.log('test');
    let { data: { tickets } } = await axios(`${SHAKEDOWN_URL}/tickets/find`,
      { method: 'post', withCredentials: true,
      data: { query: {_id: ticketId}}});


      console.log('tickets[0]: ', tickets[0]);


    dispatch({
      type: SET_TICKET_DETAILS,
      payload: tickets[0]
    });
  };
}

export const toggleForSale = (ticket) => {
  return async (dispatch, getState) => {
    let isForSale = !ticket.isForSale; // invert isForSale
    let res = await axios({
      url: `${SHAKEDOWN_URL}/tickets/${ticket._id}/sell`,
      method: 'post',
      data: {isForSale},
      withCredentials: true
    });
    let ticketObj = res.data.ticket;
    dispatch({
      type: SET_TICKET_DETAILS,
      payload: ticketObj
    });
  };
};

export const transferTicket = (ticketId, recipientAddress) => {
  return async (dispatch, getState) => {

  };
};

export const actions = {
  getTicketInfo,
  getEventInfo,
  toggleForSale,
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
