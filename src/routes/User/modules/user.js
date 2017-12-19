import pasync from 'pasync';
import axios from 'axios';

export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_USER_EVENTS = 'SET_USER_EVENTS';
export const SET_USER_TICKETS = 'SET_USER_TICKETS';
export const GET_USER_TICKETS = 'GET_USER_TICKETS';
export const GET_USER_EVENTS = 'GET_USER_EVENTS';
export const LOGOUT = 'LOGOUT';

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

export const transferTicket = (ticketAddress, recipientAddress) => {
  return async (dispatch, getState) => {
    console.log('transfer');
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

    console.log('res.data.ticket: ', res.data.ticket);

    let tickets = getState().user.tickets;
    console.log('tickets: ', tickets);
    tickets[index] = res.data.ticket;
    console.log('tickets2: ', tickets);

    dispatch({
      type: SET_USER_TICKETS,
      payload: tickets
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
  [GET_USER_INFO]: (state, action) => {
    return {
      ...state
    };
  },
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
