import axios from 'axios';
// ------------------------------------
// Constants
// ------------------------------------
export const SET_CONTRACT_INFO = 'SET_CONTRACT_INFO';

// ------------------------------------
// Actions
// ------------------------------------
const getContractInfo = () => {
  return async(dispatch) => {
    let res = await axios.get(`${EOTW_URL}/terrapin-station`);
    dispatch({
      type: SET_CONTRACT_INFO,
      payload: res.data
    });
  };
};

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_CONTRACT_INFO]: (state, action) => {
    return {
      ...state,
      terrapinAddress: action.payload.terrapinAddress,
      abis: JSON.parse(action.payload.abis)
    };
  }
};

export const actions = {
  getContractInfo
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  terrapinAddress: null,
  abis: null
};

export default function terrapinReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
