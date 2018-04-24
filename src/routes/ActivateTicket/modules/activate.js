import axios from 'axios';
import url from 'url';

// ------------------------------------
// Constants
// ------------------------------------

export const SET_EVENT_DETAILS = 'SET_EVENT_DETAILS';
export const SET_TICKET_DETAILS = 'SET_TICKET_DETAILS';
export const REDIRECT = 'REDIRECT';
export const ERROR = 'ERROR';

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
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

export function validateTicketNumber(urlSafeName, barcode) {
  return async(dispatch, getState) => {
    let options = {
      url: `${SHAKEDOWN_URL}/${urlSafeName}/validate`,
      method: 'post',
      json: true,
      data: {
        barcode
      },
      withCredentials: true
    };

    let { data } = await axios(options);

    if (!data.isValidTicket) {
      dispatch({
        type: ERROR,
        payload: 'Invalid Ticket Number'
      });
    } else {
      dispatch({
        type: ERROR,
        payload: null
      });
    }

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
    if (data.ticket) {
      dispatch({
        type: SET_TICKET_DETAILS,
        payload: data.ticket
      });
      dispatch({
        type: ERROR,
        payload: null
      });
    }
    if (data.error) {
      dispatch({
        type: ERROR,
        payload: data.error
      });
    } else {
      dispatch({
        type: ERROR,
        payload: null
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
        payload: '/my-profile'
      });
    }
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
    payload: 'activate'
  };
}

export const actions = {
  getEventInfo,
  activateTicket,
  logout
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
  [SET_TICKET_DETAILS]: (state, action) => {
    return {
      ...state,
      ticket: action.payload
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
