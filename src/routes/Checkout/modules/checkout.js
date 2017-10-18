import web3 from '../../../components/Web3.js';
import EthereumTx from 'ethereumjs-tx';
import pasync from 'pasync';

export const CHECKOUT = 'CHECKOUT';

export function checkout(something) {
  console.log('checkout called');
  return async (dispatch, getState) => {
  };
}

export const actions = {
  checkout
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHECKOUT]: (state, action) => {
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
