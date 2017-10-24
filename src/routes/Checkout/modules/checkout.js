import axios from 'axios';
import web3 from '../../../components/Web3.js';
import EthereumTx from 'ethereumjs-tx';
import pasync from 'pasync';

export const CHECKOUT = 'CHECKOUT';

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


export function checkout(something) {
  console.log('checkout called');
  return async (dispatch, getState) => {
  };
}

export const buyTicketStripe = (token, eventAddress) => {
  return async (dispatch, getState) => {
    let { walletAddress } = getState().auth.user;
    let { abis } = getState().terrapin;

    let ticketInstance = await getAvailableTicket(eventAddress, abis);

    let res = await axios.post(`${EOTW_URL}/buy-ticket`, {
      token,
      ticketAddress: ticketInstance.options.address,
      walletAddress
    });

    console.log('buying ticket through stripe', res);
  };
};

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
