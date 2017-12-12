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
export function getEventInfo(eventId) {
  return async (dispatch, getState) => {
    let { data: { event } } = await axios.get(`${SHAKEDOWN_URL}/events/${eventId}`);
    console.log('event: ', event);
    let currentEvent = {
      id: eventId,
      name: 'Test Event',
      price: 5,
      venue: {
        name: 'Test Venue',
        address: '123 Fake Street',
        city: 'Fake City',
        state: 'OH',
        zipcode: 12345
      },
      // backgroundColor:
      imageUrl: 'https://scontent.fluk1-1.fna.fbcdn.net/v/t31.0-8/24313276_10155983241603336_536130591003332189_o.jpg?oh=e11833f4696ea7867b931d36937d0071&oe=5A95E5EE',
      description: 'The law of Resonance provides the answers as to how the law of attraction operates and creates the events, conditions and circumstances in your life. A gathering of like minded, motivated, music loving individuals.',
      website: 'http://TestEvent.com'
    };

    dispatch({
      type: SET_EVENT_DETAILS,
      payload: event
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
  currentEvent: {},
  order: { ticketQty: 1 }
};

export default function eventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
