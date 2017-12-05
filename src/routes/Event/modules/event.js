import axios from 'axios';
import pasync from 'pasync';
import EthereumTx from 'ethereumjs-tx';
import moment from 'moment';

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
    //
    // const { abis } = getState().terrapin;
    // let eventInstance = getContractInstance(abis.event.abi, web3.utils.toHex(eventAddress));
    //
    // let remaining = await eventInstance.methods.getRemainingTickets().call();
    // let price = await eventInstance.methods.baseUSDPrice().call();
    //
    // let event = {
    //   id: eventInstance.options.address,
    //   name: web3.utils.toAscii(await eventInstance.methods.name().call()),
    //   owner: await eventInstance.methods.owner().call(),
    //   startDate: moment.unix(await eventInstance.methods.startDate().call()).format('DD/MM/YYYY'),
    //   endDate: moment.unix(await eventInstance.methods.endDate().call()).format('DD/MM/YYYY'),
    //   ticketsRemaining: remaining,
    //   price
    // };
    //
    // dispatch({
    //   type: SET_EVENT_DETAILS,
    //   payload: {
    //     ...getState().event,
    //     ...event
    //   }
    // });
  };
}

export function getEventAuxInfo(eventAddress) {
  return async (dispatch, getState) => {

    let event = getState().event;
    let payload = {};
    try {
      let res = await axios({
        url: `${SHAKEDOWN_URL}/event/${eventAddress}`,
        method: 'get'
      });
      payload = {
        ...event.currentEvent,
        ...res.data.event
      };
    } catch (e) {
      console.log('no aux data found');
      payload = {
        ...event.currentEvent,
      };
    }
    dispatch({
      type: SET_EVENT_DETAILS,
      payload
    });
  };
}

export const updateOrder = (order) => {
  return async (dispatch, getState) => {
    // let { abis } = getState().terrapin;
    // let availableTickets = [];
    // if user sends single address, assume it's a single ticket
    // if (order.ticketAddress) {
    //   availableTickets = [ getContractInstance(abis.ticket.abi, order.ticketAddress) ];
    // } else {
    //   availableTickets = await getAvailableTickets(order.ticketQty, order.eventAddress, abis);
    // }

    // let availableTickets = await getAvailableTickets(order.ticketQty, order.eventAddress, abis);
    // get available tickets
    // getAvailableTicket()
    // order = {
    //   ...order,
    //   ticketInstances: availableTickets
    // };
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
    let gasPrice = `0x${(GAS_PRICE * 1).toString(16)}`;

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
  getEventAuxInfo,
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
  currentEvent: {}
};

export default function eventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
