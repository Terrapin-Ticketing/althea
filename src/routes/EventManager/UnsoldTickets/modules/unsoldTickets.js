import axios from 'axios';
import pasync from 'pasync';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_UNSOLD_TICKETS = 'SET_UNSOLD_TICKETS';

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export function getUnsoldTickets(eventAddress) {
  return async (dispatch, getState) => {

  };
}

export const actions = {
  getUnsoldTickets
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_UNSOLD_TICKETS]: (state, action) => {
    return {
      ...state,
      unsoldTickets: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentEvent: {}
};

export default function eventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
