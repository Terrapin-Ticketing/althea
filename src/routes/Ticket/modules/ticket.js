import pasync from 'pasync';
import axios from 'axios';
import url from 'url';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_TICKET_DETAILS = 'SET_TICKET_DETAILS';
export const SET_EVENT_DETAILS = 'SET_EVENT_DETAILS';
export const SET_USER_INFO = 'SET_USER_INFO';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const REDIRECT = 'REDIRECT';
export const ERROR = 'ERROR';

export function getEventInfo() {
  return async (dispatch, getState) => {

  };
}

export function getTicketInfo(ticketId) {
  return async (dispatch, getState) => {
    let { data: { ticket } } = await axios({
      url: `${SHAKEDOWN_URL}/tickets/${ticketId}`,
      method: 'get',
      withCredentials: true
    });

    dispatch({
      type: SET_TICKET_DETAILS,
      payload: ticket
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

export const transferTicket = (ticketId, recipientEmail) => {
  return async (dispatch, getState) => {
    let res = await axios({
      url: `${SHAKEDOWN_URL}/tickets/${ticketId}/transfer`,
      method: 'post',
      data: {email: recipientEmail},
      withCredentials: true
    });
    return res.data
  };
};

export const sellTicket = (ticket, payoutMethod, payoutValue, index) => {
  return async (dispatch, getState) => {
    let { isForSale, price } = ticket;
    let ticketRes = await axios({
      url: `${SHAKEDOWN_URL}/tickets/${ticket._id}/sell`,
      method: 'post',
      data: {
        isForSale,
        price,
      },
      withCredentials: true
    });
    let { user } = getState().auth;
    let userRes = await axios({
      url: `${SHAKEDOWN_URL}/user/${user._id}/payout`,
      method: 'post',
      data: {
        payoutMethod,
        payoutValue
      },
      withCredentials: true
    });

    dispatch({
      type: SET_TICKET_DETAILS,
      payload: ticketRes.data.ticket
    });

    dispatch({
      type: SET_USER_INFO,
      payload: userRes.data.user
    });

  };
};

export const buyTicketsStripe = (token, ticketId) => {
  return async (dispatch, getState) => {
    let options = {
      url: `${SHAKEDOWN_URL}/payment/${ticketId}`,
      method: 'post',
      json: true,
      data: {
        token,
        fees: 150, // should be calculated later,
      },
      withCredentials: true
    };

    let { data } = await axios(options);
    if (data.error) {
      dispatch({
        type: ERROR,
        payload: data.error
      });
    } else {
      dispatch({
        type: ERROR,
        payload: null
      });
    }

    if (data.passwordChangeUrl) {
      let passwordChangeUrl = url.parse(data.passwordChangeUrl).pathname;
      dispatch({
        type: REDIRECT,
        payload: passwordChangeUrl
      });
    } else {
      dispatch({
        type: REDIRECT,
        payload: `/my-profile?ticketId=${data.ticket._id}&eventId=${data.ticket.eventId}`
      });
    }
  };
};

export const actions = {
  getTicketInfo,
  getEventInfo,
  toggleForSale,
  transferTicket,
  buyTicketsStripe
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
  },
  [REDIRECT]: (state, action) => {
    return {
      ...state,
      redirect: action.payload
    };
  },
  [ERROR]: (state, action) => {
    return {
      ...state,
      error: action.payload
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
