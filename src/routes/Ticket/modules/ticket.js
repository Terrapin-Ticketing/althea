import web3 from '../../../components/Web3.js';

let getContractInstance = (abi, address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};


// ------------------------------------
// Constants
// ------------------------------------
export const SET_TICKET_DETAILS = 'SET_TICKET_DETAILS';

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
// export function getEventInfo(eventAddress) {
//   console.log('getEventInfo called');
//   return async (dispatch, getState) => {
//
//     console.log('isAddress: ', web3.utils.toHex(eventAddress));
//
//     const { abis } = getState().terrapin;
//     let eventInstance = getContractInstance(abis.event.abi, web3.utils.toHex(eventAddress));
//     console.log('eventInstance: ', eventInstance);
//     // this take FOREVERRR to return. THIS is where our caching service will make a big difference
//     let ticketAddresses = await eventInstance.methods.getTickets().call();
//     let eventOwner = await eventInstance.methods.owner().call();
//     console.log('ticketAddresses: ', ticketAddresses);
//     let remaining = 0;
//     await pasync.each(ticketAddresses, async (ticketAddress) => {
//       console.log('ticketAddress: ', ticketAddress);
//       let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);
//       let ticketOwner = await ticketInstance.methods.owner().call();
//       if (eventOwner === ticketOwner) {
//         remaining++;
//       }
//     });
//
//     console.log('pass');
//     let event = {
//       id: eventInstance.options.address,
//       name: web3.utils.toAscii(await eventInstance.methods.name().call()),
//       owner: await eventInstance.methods.owner().call(),
//       date: web3.utils.toAscii(await eventInstance.methods.date().call()),
//       imageUrl: web3.utils.toAscii(await eventInstance.methods.imageUrl().call()),
//       venue: {
//         name: web3.utils.toAscii(await eventInstance.methods.venueName().call()),
//         address: web3.utils.toAscii(await eventInstance.methods.venueAddress().call()),
//         city: web3.utils.toAscii(await eventInstance.methods.venueCity().call()),
//         state: web3.utils.toAscii(await eventInstance.methods.venueState().call()),
//         zip: web3.utils.toAscii(await eventInstance.methods.venueZip().call()),
//       },
//       ticketsRemaining: remaining,
//       tickets: ticketAddresses,
//       price: await (getContractInstance(abis.ticket.abi, ticketAddresses[0]).methods.usdPrice().call())
//     };
//
//     console.log('getEventInfo dispatch: ', event);
//
//     dispatch({
//       type: SET_EVENT_DETAILS,
//       payload: event
//     });
//   };
// }

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
      usdPrice: await ticketInstance.methods.usdPrice().call()
    };

    console.log('getEventInfo dispatch: ', ticket);

    dispatch({
      type: SET_TICKET_DETAILS,
      payload: ticket
    });
  };
}

export const actions = {
  getTicketInfo
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
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
};

export default function eventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
