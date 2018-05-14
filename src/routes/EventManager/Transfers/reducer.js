import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_TRANSFERS = 'SET_TRANSFERS';

export function getTransfers(id) {
  return async (dispatch, getState) => {
    let res = await axios({
      url: `${SHAKEDOWN_URL}/transfers?eventId=${id}`,
      method: 'get',
      json: true,
      withCredentials: true
    });
    let { data } = res;
    console.log('data: ', data);
    dispatch({
      type: SET_TRANSFERS,
      payload: data
    });
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_TRANSFERS]: (state, action) => {
    return {
      ...state,
      transfers: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  transfers: []
};

export default function transfersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
