import axios from 'axios';
import pasync from 'pasync';
import EthereumTx from 'ethereumjs-tx';
import crypto from 'crypto';
import web3 from '../../../../components/Web3.js';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_SOLD_TICKETS = 'SET_SOLD_TICKETS';

export const actions = { };

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_SOLD_TICKETS]: (state, action) => {
    return {
      ...state,
      soldTickets: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  soldTickets: {}
};

export default function eventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
