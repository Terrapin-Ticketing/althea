import pasync from 'pasync';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export const SET_USER_EVENTS = 'SET_USER_EVENTS';
export const SET_USER_TICKETS = 'SET_USER_TICKETS';
export const SET_USER_INFO = 'SET_USER_INFO';
export const LOGOUT = 'LOGOUT';

function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  let nameEQ = name + '=';
  let ca = document.cookie.split(';');
  for (let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

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

export const getUserEvents = () => {
  return async (dispatch, getState) => {
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

export const toggleForSale = (ticket, index) => {
  return async (dispatch, getState) => {
    let isForSale = !ticket.isForSale; // invert isForSale
    let res = await axios({
      url: `${SHAKEDOWN_URL}/tickets/${ticket._id}/sell`,
      method: 'post',
      data: {isForSale},
      withCredentials: true
    });

    let tickets = getState().user.tickets;
    tickets[index] = res.data.ticket;

    dispatch({
      type: SET_USER_TICKETS,
      payload: tickets
    });
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
    let tickets = getState().user.tickets;
    tickets[index] = ticketRes.data.ticket;
    user = userRes.data.user;


    let { token } = userRes.data;

    // set cookie
    let cookieToken = getCookie('cookieToken');
    if (!cookieToken) {
      setCookie('cookieToken', token, 2);
    }

    user = jwt.decode(token);

    dispatch({
      type: SET_USER_TICKETS,
      payload: tickets
    });

    dispatch({
      type: SET_USER_INFO,
      payload: user
    });

  };
};

// export const actions = {
//   // getUserTickets,
//   getUserEvents,
//   getUserBalance,
//   transferTicket
// };

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_USER_TICKETS]: (state, action) => {
    return {
      ...state,
      tickets: action.payload
    };
  },
  [SET_USER_EVENTS]: (state, action) => {
    return {
      ...state,
      events: action.payload
    };
  },
  [LOGOUT]: (state, action) => {
    return {
      ...state,
      tickets: null,
      events: null
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
