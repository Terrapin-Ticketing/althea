import axios from 'axios';
import url from 'url';

// ------------------------------------
// Constants
// ------------------------------------

export const SET_EVENT_DETAILS = 'SET_EVENT_DETAILS';
export const REDIRECT = 'REDIRECT';
export const ERROR = 'ERROR';

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export function getEventInfo(urlSafeName) {
  return async (dispatch, getState) => {
    let options = {
      url: `${SHAKEDOWN_URL}/events/find`,
      method: 'post',
      json: true,
      data: { query: { urlSafe: urlSafeName } },
      withCredentials: true
    };

    let { data: { events } } = await axios(options);
    dispatch({
      type: SET_EVENT_DETAILS,
      payload: events[0]
    });
  };
}

export function activateTicket(urlSafeName, email, barcode) {
  return async(dispatch, getState) => {
    let options = {
      url: `${SHAKEDOWN_URL}/${urlSafeName}/activate`,
      method: 'post',
      json: true,
      data: {
        email,
        barcode
      },
      withCredentials: true
    };

    let { data } = await axios(options);

    if (data.error) {
      dispatch({
        type: ERROR,
        payload: data.error
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
        payload: 'my-profile'
      });
    }
  };
}

export const actions = {
  getEventInfo,
  activateTicket
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_EVENT_DETAILS]: (state, action) => {
    return {
      ...state,
      event: action.payload
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
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  event: {}
};
export default function activateReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
