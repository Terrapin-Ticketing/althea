import axios from 'axios';
import pasync from 'pasync';
import EthereumTx from 'ethereumjs-tx';
import crypto from 'crypto';
import web3 from '../../../components/Web3.js';

const gwei = 1000000000;

let getContractInstance = (abi, address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};

async function getAvailableTicket(eventAddress, abis) {
  let eventInstance = getContractInstance(abis.event.abi, eventAddress);
  let eventOwner = await eventInstance.methods.owner().call();

  let ticketAddresses = await eventInstance.methods.getTickets().call();

  let isBreak = false;
  let availableTicket;
  await pasync.eachSeries(ticketAddresses, async (ticketAddress) => {
    if (isBreak) return;
    let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);
    let ticketOwner = await ticketInstance.methods.owner().call();

    if (ticketOwner === eventOwner) {
      availableTicket = ticketInstance;

      // let newOwner = await ticketInstance.methods.owner().call();
      isBreak = true;
    }
  });
  return availableTicket;
}

// ------------------------------------
// Constants
// ------------------------------------
export const GET_EVENTS = 'GET_EVENTS';
export const SET_EVENTS = 'SET_EVENTS';
export const CLEAR_EVENTS = 'CLEAR_EVENTS';

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export function getEvents() {
  return async (dispatch, getState) => {
    const { abis, terrapinAddress } = getState().terrapin;

    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddress);

    let eventAddresses = await terrapinInstance.methods.getEvents().call();
    let events = [];
    await pasync.eachSeries(eventAddresses, async (eventAddress) => {
      let eventInstance = getContractInstance(abis.event.abi, eventAddress);
      let eventOwner = await eventInstance.methods.owner().call();

      // this take FOREVERRR to return. THIS is where our caching service will make a big difference
      let ticketAddresses = await eventInstance.methods.getTickets().call();

      let remaining = 0;
      await pasync.each(ticketAddresses, async (ticketAddress) => {
        let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);
        let ticketOwner = await ticketInstance.methods.owner().call();
        if (eventOwner === ticketOwner) {
          remaining++;
        }
      });

      events.push({
        id: eventInstance.options.address,
        name: web3.utils.toAscii(await eventInstance.methods.name().call()),
        qty: remaining,
        price: await (getContractInstance(abis.ticket.abi, ticketAddresses[0]).methods.usdPrice().call())
      });

      dispatch({
        type: SET_EVENTS,
        payload: events
      });
    });
  };
}

export const actions = {
  getEvents
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EVENTS]: (state, action) => {
    return {
      ...state,
      events: action.payload
    };
  },
  [SET_EVENTS]: (state, action) => {
    return {
      ...state,
      events: action.payload
    };
  },
  [CLEAR_EVENTS]: (state) => {
    return {
      ...state,
      events: []
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  events: []
};

export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
