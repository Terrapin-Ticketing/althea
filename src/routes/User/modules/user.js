import web3 from '../../../components/Web3.js'

export const GET_USER_INFO = 'GET_USER_INFO'
export const SET_USER_EVENTS = 'SET_USER_EVENTS'
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
  console.log('hits getUserEvents');
  const events = [{ id: "0x712982674F171933e0bcad11D6eEc6f3eE782A90", name: "The String Cheese Incident", qty: 7, price: "100" },
  { id: "0x712982674F171933e0bcad11D6eEc6f3eE782A91", name: "Phish", qty: 7, price: "100" },
  { id: "0x712982674F171933e0bcad11D6eEc6f3eE782A92", name: "Widespread Panic", qty: 7, price: "100" },
  { id: "0x712982674F171933e0bcad11D6eEc6f3eE782A93", name: "Greensky Bluegrass", qty: 7, price: "100" }];
  return (dispatch, getState) => {
    console.log('events: ', events);
    dispatch({
      type: SET_USER_EVENTS,
      payload: events
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
  [SET_USER_EVENTS]  : (state, action) => {
    console.log('hits SET_USER_EVENTS: ', action.payload);
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
