import axios from 'axios';
import pasync from 'pasync';
import moment from 'moment';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_EVENTS = 'GET_EVENTS';
export const SET_EVENTS = 'SET_EVENTS';
export const CLEAR_EVENTS = 'CLEAR_EVENTS';

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export function getEvents() {
  return async (dispatch, getState) => {
    let options = {
      url: `${SHAKEDOWN_URL}/events`,
      method: 'get',
      json: true,
      data: {},
      withCredentials: true
    };

    let { data: { events } } = await axios(options);

    events = events.filter((event) => {
      const endDate = new Date(event.endDate);
      const difference = endDate - Date.now();
      return difference > 0;
    })

    dispatch({
      type: SET_EVENTS,
      payload: events
    });
  };
}

export const actions = {
  getEvents
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EVENTS]: (state, action) => {
    return {
      ...state,
      events: action.payload
    };
  },
  [SET_EVENTS]: (state, action) => {
    return {
      ...state,
      events: action.payload
    };
  },
  [CLEAR_EVENTS]: (state) => {
    return {
      ...state,
      events: []
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  events: []
};

export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
