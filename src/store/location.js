import browserHistory from 'react-router/lib/browserHistory'

// ------------------------------------
// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE'
export const SET_REDIRECT_URL = 'SET_REDIRECT_URL'
export const CLEAR_REDIRECT_URL = 'CLEAR_REDIRECT_URL'

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange(location = '/') {
  return {
    type: LOCATION_CHANGE,
    payload: location
  };
}

export function setRedirectUrl(path) {
  return async(dispatch, getState) => {
    dispatch({
      type: SET_REDIRECT_URL,
      payload: path
    });
  }
}

export function clearRedirectUrl() {
  return async(dispatch, getState) => {
    dispatch({
      type: CLEAR_REDIRECT_URL,
      payload: null
    });
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation));
};

const ACTION_HANDLERS = {
  [LOCATION_CHANGE]: (state, action) => {
    return {
      ...state,
      location: action.payload
    };
  },
  [SET_REDIRECT_URL]: (state, action) => {
    return {
      ...state,
      redirectUrl: action.payload
    };
  },
  [CLEAR_REDIRECT_URL]: (state, action) => {
    return {
      ...state,
      redirectUrl: action.payload
    };
  },
};

export const actions = {
  updateLocation,
  setRedirectUrl,
  clearRedirectUrl
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  location: browserHistory.getCurrentLocation(),
  redirectUrl: null
};

export default function locationReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
