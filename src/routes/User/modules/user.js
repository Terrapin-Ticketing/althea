import web3 from '../../../components/Web3.js'

export const GET_USER_INFO = 'GET_USER_INFO'
export const GET_USER_BALANCE = 'GET_USER_BALANCE'
export const GET_USER_TICKETS = 'GET_USER_TICKETS'
export const GET_USER_EVENTS = 'GET_USER_EVENTS'

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
  return (dispatch, getState) => {
    // web3.eth
    //
    // .then((tickets) => {
    //   dispatch({
    //     type: GET_USER_TICKETS,
    //     payload: tickets
    //   })
    // });

  }
}

export const getUserEvents = () => {
  return (dispatch, getState) => {
    const { abis, terrapinAddress } = getState().events;
    let terrapin = new web3.eth.Contract(abis.terrapin.abi, terrapinAddress);
    let userEvents = [];
    return terrapin.methods.getEvents().call().then((eventContractAddrs) => {
      let populatedEvents = eventContractAddrs.map((eventAddr, index) => {
        let eventContract = new web3.eth.Contract(abis.event.abi, eventAddr)
      });
    });

    // .then((tickets) => {
    //   dispatch({
    //     type: GET_USER_EVENTS,
    //     payload: tickets
    //   })
    // });
  }

}

export const getUserBalance = (privateKey) => {
  return (dispatch, getState) => {
    web3.eth.getBalance(getState().auth.user.walletAddress)
      .then((balance) => {
        dispatch({
          type: GET_USER_BALANCE,
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
  [GET_USER_BALANCE]  : (state, action) => {
    return {
      ...state,
      balance: action.payload
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
