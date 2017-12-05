import pasync from 'pasync';
import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_TICKET_DETAILS = 'SET_TICKET_DETAILS';
export const SET_EVENT_DETAILS = 'SET_EVENT_DETAILS';
export const UPDATE_ORDER = 'UPDATE_ORDER';

export function getEventInfo() {
  return async (dispatch, getState) => {

  };
}

export function getEventAuxInfo(eventAddress) {
  return async (dispatch, getState) => {

  };
}

export const updateOrder = (order) => {
  return async (dispatch, getState) => {
    // let { abis } = getState().terrapin;
    // let availableTickets = [];
    // // if user sends single address, assume it's a single ticket
    // if (order.ticketAddress) {
    //   availableTickets = [ order.ticketAddress ];
    // } else {
    //   availableTickets = await getAvailableTickets(order.ticketQty, order.eventAddress, abis);
    // }
    //
    // // let availableTickets = await getAvailableTickets(order.ticketQty, order.eventAddress, abis);
    // // get available tickets
    // // getAvailableTicket()
    // order = {
    //   ...order,
    //   ticketInstances: availableTickets
    // };
    // dispatch({
    //   type: UPDATE_ORDER,
    //   payload: order
    // });
  };
};

export function getTicketInfo(ticketAddress) {
  console.log('getTicketInfo called');
  return async (dispatch, getState) => {
    console.log('ticketAddress: ', ticketAddress);
    console.log('ticket isAddress: ', web3.utils.toHex(ticketAddress));

    const { abis } = getState().terrapin;
    let ticketInstance = getContractInstance(abis.ticket.abi, web3.utils.toHex(ticketAddress));
    console.log('ticketInstance: ', ticketInstance);

    let ticket = {
      id: await ticketInstance.options.address,
      master: await ticketInstance.methods.master().call(),
      owner: await ticketInstance.methods.owner().call(),
      issuer: await ticketInstance.methods.issuer().call(),
      eventAddress: await ticketInstance.methods.eventAddress().call(),
      isRedeemed: await ticketInstance.methods.isRedeemed().call(),
      usdPrice: await ticketInstance.methods.usdPrice().call(),
      isForSale: await ticketInstance.methods.isForSale().call(),
    };

    console.log('getEventInfo dispatch: ', ticket);

    dispatch({
      type: SET_TICKET_DETAILS,
      payload: ticket
    });
  };
}

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
  console.log('availableTickets: ', availableTickets);
  return availableTickets;
}

export const sellTicket = (ticket) => {
  return async (dispatch, getState) => {
    let { privateKey } = getState().auth.user;

    console.log(ticket);
    console.log(privateKey);

    const { abis } = getState().terrapin;
    const ticketInstance = getContractInstance(abis.ticket.abi, ticket.id);

    let chainId = await web3.eth.net.getId();
    let nonce = await web3.eth.getTransactionCount(getState().auth.user.walletAddress);
    console.log('before');
    let encodedAbi = ticketInstance.methods.setIsForSale(true).encodeABI();
    let txParams = {
      nonce: nonce,
      chainId: chainId,
      to: ticketInstance.options.address, // with 0x
      gas: `0x${(4700000).toString(16)}`,
      gasPrice: `0x${(4000000000).toString(16)}`,
      data: encodedAbi
    };

    const tx = new EthereumTx(txParams);
    tx.sign(new Buffer(privateKey));
    console.log('aftere');
    const serializedTx = tx.serialize();
    await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);
    console.log('herer');
    return true;
  };
};

export const transferTicket = (ticketAddress, recipientAddress) => {
  return async (dispatch, getState) => {
    let { privateKey } = getState().auth.user;

    console.log('hits transferTicket');
    console.log('ticketAddress: ', ticketAddress);

    const { abis } = getState().terrapin;
    const ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);

    let chainId = await web3.eth.net.getId();
    let nonce = await web3.eth.getTransactionCount(getState().auth.user.walletAddress);

    let encodedAbi = ticketInstance.methods.transferTicket(recipientAddress).encodeABI();
    let txParams = {
      nonce: nonce,
      chainId: chainId,
      to: ticketAddress, // with 0x
      gas: `0x${(4700000).toString(16)}`,
      gasPrice: `0x${(4000000000).toString(16)}`,
      data: encodedAbi
    };

    const tx = new EthereumTx(txParams);
    tx.sign(new Buffer(privateKey));
    const serializedTx = tx.serialize();
    let transaction = await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);
  };
};

export const actions = {
  getTicketInfo,
  getEventInfo,
  getEventAuxInfo,
  updateOrder,
  sellTicket,
  transferTicket
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_TICKET_DETAILS]: (state, action) => {
    return {
      ...state,
      ticket: action.payload
    };
  },
  [SET_EVENT_DETAILS]: (state, action) => {
    return {
      ...state,
      currentEvent: {
        ...state.currentEvent,
        ...action.payload
      }
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
  ticket: {},
  currentEvent: {}
};

export default function eventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
