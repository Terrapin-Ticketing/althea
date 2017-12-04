import pasync from 'pasync';
import web3 from '../../../components/Web3.js';

let getContractInstance = (abi, address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};
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

      let remaining = await eventInstance.methods.getRemainingTickets().call();
      console.log('herer');
      let price = parseInt(await eventInstance.methods.getTicketPrice('GA').call());
      console.log('price', price);

      events.push({
        id: eventInstance.options.address,
        name: web3.utils.toAscii(await eventInstance.methods.name().call()),
        qty: remaining,
        price
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
