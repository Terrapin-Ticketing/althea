import axios from 'axios';
import pasync from 'pasync';

async function getAvailableTickets(num, eventAddress, abis) {
  // let eventInstance = getContractInstance(abis.event.abi, eventAddress);
  // let eventOwner = await eventInstance.methods.owner().call();
  //
  // let ticketAddresses = await eventInstance.methods.getTickets().call();
  //
  // let isBreak = false;
  // let availableTickets = [];
  //
  // await pasync.eachSeries(ticketAddresses, async (ticketAddress) => {
  //   if (isBreak) return;
  //   let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);
  //   let ticketOwner = await ticketInstance.methods.owner().call();
  //
  //   if (ticketOwner === eventOwner) {
  //     availableTickets.push(ticketInstance);
  //     // availableTicket = ticketInstance;
  //     if (availableTickets.length >= num) {
  //       isBreak = true;
  //     }
  //   }
  // });
  // console.log('availableTickets: ', availableTickets);
  // return availableTickets;
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

    dispatch({
      type: SET_EVENT_DETAILS,
      payload: {
        ...getState().event,
        ...event
      }
    });
  };
}

export function getEventAuxInfo(eventAddress) {
  return async (dispatch, getState) => {

    let event = getState().event;
    let res = await axios({
      url: `${SHAKEDOWN_URL}/event/${eventAddress}`,
      method: 'get'
    });

    dispatch({
      type: SET_EVENT_DETAILS,
      payload: {
        ...event.currentEvent,
        ...res.data.event
      }
    });
  };
}

export const updateOrder = (order) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_ORDER,
      payload: order
    });
  };
};

export const buyTicket = (event, qty) => {
  return async (dispatch, getState) => {

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
