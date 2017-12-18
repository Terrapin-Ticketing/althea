import axios from 'axios';

export const CHECKOUT = 'CHECKOUT';
export const SET_TX_LIST = 'SET_TX_LIST';


export function getEtherPrice() {
  return async (dispatch, getState) => {
    // let res = JSON.parse(await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR'));
    // console.log('ETHER PRICE:', res.USD, res);
    // dispatch({
    //   type: 'none',
    //   payload: []
    // });
  };
}

export function priceToEther(usdPrice) {
  return async (dispatch, getState) => {
  };
}

export function checkout(something) {
  return async (dispatch, getState) => {
  };
}

export const buyTicketsStripe = (token, order) => {
  return async (dispatch, getState) => {

    console.log('order:', order);

    let options = {
      url: `${SHAKEDOWN_URL}/payment`,
      method: 'post',
      json: true,
      data: {
        token,
        fees: 150, // should be calculated later
        qty: order.ticketQty,
        eventAddress: order.eventAddress,
        paymentType: 'USD'
      },
      withCredentials: true
    };

    let res = await axios(options);

    dispatch({
      type: SET_TX_LIST,
      payload: res.data
    });

    return res.data;
  };
};

export const actions = {
  checkout,
  getEtherPrice
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHECKOUT]: (state, action) => {
    return {
      ...state
    };
  },
  [SET_TX_LIST]: (state, action) => {
    return {
      ...state,
      txList: action.payload
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
