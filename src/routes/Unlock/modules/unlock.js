export const TYPE = 'TYPE';

// ------------------------------------
// Actions
// ------------------------------------
export const test = (password) => {
  return async function(dispatch, getState) {
  };
};

export const actions = {
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TYPE]: (state, action) => {
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
export default function UnlockReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
