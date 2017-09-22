import web3 from '../../../components/Web3.js'
import pasync from 'pasync';

export const GET_USER_INFO = 'GET_USER_INFO'
export const SET_USER_EVENTS = 'SET_USER_EVENTS'
export const SET_USER_TICKETS = 'SET_USER_TICKETS'
export const GET_USER_TICKETS = 'GET_USER_TICKETS'
export const GET_USER_EVENTS = 'GET_USER_EVENTS'

let getContractInstance = (abi, address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};

export const getUserInfo = () => {
  // return (dispatch, getState) => {
  //   web3.eth
  //
  //   .then((tickets) => {
  //     dispatch({
  //       type: GET_USER_INFO,
  //       payload: tickets
  //     })
  //   });
  //
  // }
};

export const getUserTickets = () => {
  return async (dispatch, getState) => {
    let { user } = getState().auth;

    let { abis, terrapinAddress } = getState().terrapin;
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddress);

    let eventAddresses = await terrapinInstance.methods.getEvents().call();

    let tickets = [];

    return pasync.eachSeries(eventAddresses, async (eventAddress) => {
      let eventInstance = getContractInstance(abis.event.abi, eventAddress);
      let ticketAddreses = await eventInstance.methods.getTickets().call();

      return pasync.eachSeries(ticketAddreses, async (ticketAddress) => {
        let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);
        let owner = await ticketInstance.methods.owner().call();
        if (owner === user.walletAddress) {
          tickets.push({
            id: ticketInstance.options.address,
            eventId: eventInstance.options.address,
            name: web3.utils.toAscii(await eventInstance.methods.name().call()),
            price: await ticketInstance.methods.price().call()
          });

          dispatch({
            type: SET_USER_TICKETS,
            payload: tickets
          });
        }
      });
    });
  };
};

export const getUserEvents = () => {
  return async (dispatch, getState) => {
    let { user } = getState().auth;

    let { abis, terrapinAddress } = getState().terrapin;
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddress);

    let eventAddresses = await terrapinInstance.methods.getEvents().call();

    let events = [];

    return pasync.eachSeries(eventAddresses, async (eventAddress) => {
      let eventInstance = getContractInstance(abis.event.abi, eventAddress);
      let owner = await eventInstance.methods.owner().call();
      if (owner === user.walletAddress) {
        let ticketAddreses = await eventInstance.methods.getTickets().call();

        let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddreses[0]);

        events.push({
          id: eventInstance.options.address,
          name: web3.utils.toAscii(await eventInstance.methods.name().call()),
          qty: ticketAddreses.length,
          price: await (ticketInstance.methods.price().call())
        });

        dispatch({
          type: SET_USER_EVENTS,
          payload: events
        });
      }
    });
  };
};

export const getUserBalance = (privateKey) => {
  return (dispatch, getState) => {
    web3.eth.getBalance(getState().auth.user.walletAddress)
      .then((balance) => {
        dispatch({
          type: 'SET_USER_BALANCE',
          payload: balance
        });
      });
  }
}

export const actions = {
  getUserInfo,
  // getUserTickets,
  getUserEvents,
  getUserBalance
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_USER_INFO]  : (state, action) => {
    return {
      ...state
    }
  },
  [SET_USER_TICKETS]: (state, action) => {
    return {
      ...state,
      tickets: action.payload
    }
  },
  [SET_USER_EVENTS]  : (state, action) => {
    return {
      ...state,
      events: action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
