import axios from 'axios';
import pasync from 'pasync';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_SOLD_TICKETS = 'SET_SOLD_TICKETS';

export const actions = { };

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_SOLD_TICKETS]: (state, action) => {
    return {
      ...state,
      soldTickets: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  soldTickets: {}
};

export default function eventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
