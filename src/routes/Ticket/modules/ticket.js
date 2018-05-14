import pasync from 'pasync';
import axios from 'axios';
import url from 'url';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_TICKET_DETAILS = 'SET_TICKET_DETAILS';
export const SET_EVENT_DETAILS = 'SET_EVENT_DETAILS';
export const SET_EVENT_INFO = 'SET_EVENT_INFO';
export const SET_USER_INFO = 'SET_USER_INFO';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const REDIRECT = 'REDIRECT';
export const ERROR = 'ERROR';

export function getEventInfo(id) {
  return async (dispatch, getState) => {
    let res = await axios({
      url: `${SHAKEDOWN_URL}/events/${id}`,
      method: 'get',
      withCredentials: true
    });

    dispatch({
      type: SET_EVENT_INFO,
      payload: res.data.event
    });
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

    return ticket;
  };
}

export function buyTicketsStripe(token, ticketId, transferToUser) {
  return async (dispatch, getState) => {
    let options = {
      url: `${SHAKEDOWN_URL}/payment/${ticketId}`,
      method: 'post',
      json: true,
      data: {
        token: token.id,
        transferToEmail: transferToUser.email
      },
      withCredentials: true
    };

    let { data } = await axios(options);
    if (data.error) {
      return dispatch({
        type: ERROR,
        payload: data.error
      });
    }

    dispatch({
      type: ERROR,
      payload: null
    });

    if (data.passwordChangeUrl) {
      let passwordChangeUrl = url.parse(data.passwordChangeUrl).pathname;
      dispatch({
        type: REDIRECT,
        payload: passwordChangeUrl
      });
    } else {
      dispatch({
        type: REDIRECT,
        payload: `/event/${data.ticket.event._id}/ticket/${data.ticket._id}`
      });
    }
  };
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
  [SET_EVENT_INFO]: (state, action) => {
    return {
      ...state,
      currentEvent: action.payload
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
