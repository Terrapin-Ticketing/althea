import axios from 'axios';
import pasync from 'pasync';
import EthereumTx from 'ethereumjs-tx';
import moment from 'moment';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_EVENT_DETAILS = 'SET_EVENT_DETAILS';
export const UPDATE_ORDER = 'UPDATE_ORDER';

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export function getEventInfo(eventId) {
  return async (dispatch, getState) => {
    let { data: { event } } = await axios.get(`${SHAKEDOWN_URL}/events/${eventId}`);
    dispatch({
      type: SET_EVENT_DETAILS,
      payload: event
    });
  };
}

export const updateOrder = (order) => {
  return async (dispatch, getState) => {

    dispatch({
      type: UPDATE_ORDER,
      payload: order
    });
  };
};

export const buyTicket = (event, qty) => {
  return async (dispatch, getState) => {
  };
};

export const actions = {
  getEventInfo,
  updateOrder,
  buyTicket
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_EVENT_DETAILS]: (state, action) => {
    return {
      ...state,
      currentEvent: action.payload
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
  currentEvent: {},
  order: { ticketQty: 1 }
};

export default function eventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
