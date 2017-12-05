import pasync from 'pasync';

export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_USER_EVENTS = 'SET_USER_EVENTS';
export const SET_USER_TICKETS = 'SET_USER_TICKETS';
export const GET_USER_TICKETS = 'GET_USER_TICKETS';
export const GET_USER_EVENTS = 'GET_USER_EVENTS';
export const LOGOUT = 'LOGOUT';

export const getUserTickets = () => {
  return async (dispatch, getState) => {
  };
};

export const getUserEvents = () => {
  return async (dispatch, getState) => {
  };
};

export const getUserBalance = () => {
  return (dispatch, getState) => {
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
