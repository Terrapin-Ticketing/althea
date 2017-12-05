import moment from 'moment';

export const CREATE_EVENT = 'CREATE_EVENT';

export const createEvent = (name, usdPrice, imageUrl, date, venueName, venueAddress, venueCity, venueState, venueZip, qty) => {
  return async function(dispatch, getState) {

    dispatch({
      type: CREATE_EVENT,
      payload: ''
    });
  };
};

export const actions = {
  createEvent
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREATE_EVENT]: (state, action) => {
    return {
      ...state
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
};
export default function createEventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
