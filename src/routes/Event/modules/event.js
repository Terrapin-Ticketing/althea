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

async function getAvailableTickets(num, eventAddress, abis) {
  let eventInstance = getContractInstance(abis.event.abi, eventAddress);
  let eventOwner = await eventInstance.methods.owner().call();

  let ticketAddresses = await eventInstance.methods.getTickets().call();

  let isBreak = false;
  let availableTickets = [];
  await pasync.eachSeries(ticketAddresses, async (ticketAddress) => {
    if (isBreak) return;
    let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);
    let ticketOwner = await ticketInstance.methods.owner().call();

    if (ticketOwner === eventOwner) {
      availableTickets.push(ticketInstance);
      // availableTicket = ticketInstance;
      if (availableTickets.length >= num) {
        isBreak = true;
      }
    }
  });
  return availableTickets;
}

// ------------------------------------
// Constants
// ------------------------------------
export const SET_EVENT_DETAILS = 'SET_EVENT_DETAILS';
export const UPDATE_ORDER = 'UPDATE_ORDER';

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export function getEventInfo(eventAddress) {
  return async (dispatch, getState) => {
    console.log('before isAddress: ', eventAddress);
    console.log('isAddress: ', web3.utils.toHex(eventAddress));

    const { abis } = getState().terrapin;
    let eventInstance = getContractInstance(abis.event.abi, web3.utils.toHex(eventAddress));
    // this take FOREVERRR to return. THIS is where our caching service will make a big difference
    let ticketAddresses = await eventInstance.methods.getTickets().call();
    let eventOwner = await eventInstance.methods.owner().call();
    let remaining = 0;
    await pasync.each(ticketAddresses, async (ticketAddress) => {
      let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);
      let ticketOwner = await ticketInstance.methods.owner().call();
      if (eventOwner === ticketOwner) {
        remaining++;
      }
    });

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

    dispatch({
      type: SET_EVENT_DETAILS,
      payload: event
    });
  };
}

export const updateOrder = (order) => {
  return async (dispatch, getState) => {
    let { abis } = getState().terrapin;
    let availableTickets = await getAvailableTickets(order.ticketQty, order.eventAddress, abis);
    // get available tickets
    // getAvailableTicket()
    order = {
      ...order,
      ticketInstances: availableTickets
    };
    dispatch({
      type: UPDATE_ORDER,
      payload: order
    });
  };
};

export const buyTicket = (event, qty) => {
  return async (dispatch, getState) => {
    let { walletAddress, encryptedPrivateKey } = getState().auth.user;

    let { privateKey } = getState().auth.user;

    let { abis } = getState().terrapin;

    let eventInstance = getContractInstance(abis.event.abi, event.id);
    let eventOwner = await eventInstance.methods.owner().call();

    let ticketAddresses = await eventInstance.methods.getTickets().call();
    let nonce = await web3.eth.getTransactionCount(walletAddress);
    let chainId = await web3.eth.net.getId();
    let gas = `0x${(4700000).toString(16)}`;
    let gasPrice = `0x${(gwei * 20).toString(16)}`;

    let isBreak = 0;
    await pasync.eachSeries(ticketAddresses, async (ticketAddress) => {
      if (isBreak >= qty) return;
      let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);
      let ticketOwner = await ticketInstance.methods.owner().call();

      if (ticketOwner === eventOwner) {
        let ticketPrice = parseInt(await ticketInstance.methods.usdPrice().call()); // TODO: this will need to be modified

        let encodedAbi = ticketInstance.methods.buyTicket().encodeABI();
        let txParams = {
          nonce,
          chainId,
          to: ticketInstance.options.address,
          value: ticketPrice,
          gas,
          gasPrice,
          data: encodedAbi
        };

        let tx = new EthereumTx(txParams);
        tx.sign(new Buffer(privateKey));
        let serializedTx = tx.serialize();

        await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);

        let newOwner = await ticketInstance.methods.owner().call();
        nonce++;
        isBreak++;
      }
    });
  };
};

export const actions = {
  getEventInfo,
  updateOrder,
  buyTicket
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_EVENT_DETAILS]: (state, action) => {
    return {
      ...state,
      currentEvent: action.payload
    };
  },
  [UPDATE_ORDER]: (state, action) => {
    return {
      ...state,
      order: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentEvent: {}
};

export default function eventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
