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

// ------------------------------------
// Constants
// ------------------------------------
export const SET_EVENT_TICKETS = 'SET_EVENT_TICKETS';
export const SET_EVENT_DETAILS = 'SET_EVENT_DETAILS';

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export const getEventTickets = (eventAddress) => {
  return async (dispatch, getState) => {
    let { user } = getState().auth;

    let { abis, terrapinAddress } = getState().terrapin;
    let eventInstance = getContractInstance(abis.event.abi, eventAddress);
    let soldTickets = [];
    let unsoldTickets = [];
    let ticketAddreses = await eventInstance.methods.getTickets().call();
    return pasync.eachSeries(ticketAddreses, async (ticketAddress) => {
      let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);
      let owner = await ticketInstance.methods.owner().call();
      let isRedeemed = await ticketInstance.methods.isRedeemed().call();
      if (owner === user.walletAddress) {
        unsoldTickets.push({
          id: ticketInstance.options.address,
          price: await ticketInstance.methods.usdPrice().call(),
          owner,
          isRedeemed
        });
      } else {
        soldTickets.push({
          id: ticketInstance.options.address,
          price: await ticketInstance.methods.usdPrice().call(),
          owner,
          isRedeemed
        });
      }

      console.log('unsoldTickets: ', unsoldTickets);
      console.log('soldTickets: ', soldTickets);

      dispatch({
        type: SET_EVENT_TICKETS,
        payload: {
          unsoldTickets,
          soldTickets
        }
      });
    });
  };
};

export function getEventInfo(eventAddress) {
  console.log('getEventInfo called');
  return async (dispatch, getState) => {
    console.log('before isAddress: ', eventAddress);
    console.log('isAddress: ', web3.utils.toHex(eventAddress));

    const { abis } = getState().terrapin;
    let eventInstance = getContractInstance(abis.event.abi, web3.utils.toHex(eventAddress));
    console.log('eventInstance: ', eventInstance);
    // this take FOREVERRR to return. THIS is where our caching service will make a big difference
    let ticketAddresses = await eventInstance.methods.getTickets().call();
    let eventOwner = await eventInstance.methods.owner().call();
    console.log('ticketAddresses: ', ticketAddresses);
    let remaining = 0;
    await pasync.each(ticketAddresses, async (ticketAddress) => {
      console.log('ticketAddress: ', ticketAddress);
      let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);
      let ticketOwner = await ticketInstance.methods.owner().call();
      if (eventOwner === ticketOwner) {
        remaining++;
      }
    });

    console.log('pass');
    let event = {
      id: eventInstance.options.address,
      name: web3.utils.toAscii(await eventInstance.methods.name().call()),
      owner: await eventInstance.methods.owner().call(),
      date: web3.utils.toAscii(await eventInstance.methods.date().call()),
      imageUrl: web3.utils.toAscii(await eventInstance.methods.imageUrl().call()),
      venue: {
        name: web3.utils.toAscii(await eventInstance.methods.venueName().call()),
        address: web3.utils.toAscii(await eventInstance.methods.venueAddress().call()),
        city: web3.utils.toAscii(await eventInstance.methods.venueCity().call()),
        state: web3.utils.toAscii(await eventInstance.methods.venueState().call()),
        zip: web3.utils.toAscii(await eventInstance.methods.venueZip().call()),
      },
      ticketsRemaining: remaining,
      tickets: ticketAddresses,
      price: await (getContractInstance(abis.ticket.abi, ticketAddresses[0]).methods.usdPrice().call())
    };

    console.log('getEventInfo dispatch: ', event);

    dispatch({
      type: SET_EVENT_DETAILS,
      payload: event
    });
  };
}

export const actions = {
  getEventTickets,
  getEventInfo
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_EVENT_TICKETS]: (state, action) => {
    return {
      ...state,
      unsoldTickets: action.payload.unsoldTickets,
      soldTickets: action.payload.soldTickets
    };
  },
  [SET_EVENT_DETAILS]: (state, action) => {
    return {
      ...state,
      event: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  unsoldTickets: [],
  soldTickets: [],
  event: {}
};

export default function eventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
