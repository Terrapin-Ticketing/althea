import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_EVENT_DETAILS = 'SET_EVENT_DETAILS';

export function getEventInfo(urlSafeName) {
  return async (dispatch, getState) => {
    let options = {
      url: `${SHAKEDOWN_URL}/events?urlSafe=${urlSafeName}`,
      method: 'get',
      json: true,
      withCredentials: true
    };

    let { data: { events } } = await axios(options);
    dispatch({
      type: SET_EVENT_DETAILS,
      payload: events[0]
    });
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_EVENT_DETAILS]: (state, action) => {
    return {
      ...state,
      currentEvent: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentEvent: {}
};

export default function eventManagerReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
