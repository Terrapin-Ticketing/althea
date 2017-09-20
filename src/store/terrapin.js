// ------------------------------------
// Constants
// ------------------------------------
export const SET_CONTRACT_INFO = 'SET_CONTRACT_INFO'

// ------------------------------------
// Actions
// ------------------------------------


// ------------------------------------
// Specialized Action Creator
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_CONTRACT_INFO]: (state, action) => {
    console.log('action: ', action)
    return {
      ...state,
      terrapin: {
        terrapinAddress: action.payload.terrapinAddress,
        abis: JSON.parse(action.payload.abis)
      }
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  terrapin: null
};

export default function terrapinReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
