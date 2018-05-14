import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PAYMENTS = 'SET_PAYMENTS';

export function getPayments(id) {
  return async (dispatch, getState) => {
    let res = await axios({
      url: `${SHAKEDOWN_URL}/payouts`,
      method: 'get',
      json: true,
      withCredentials: true
    });
    let { data } = res
    console.log('data: ', data);
    dispatch({
      type: SET_PAYMENTS,
      payload: data
    });
  };
}

export function togglePaid(id) {
  return async(dispatch, getState) => {
    await axios({
      url: `${SHAKEDOWN_URL}/payouts/${id}/isPaid`,
      method: 'put',
      json: true,
      withCredentials: true
    });

    let res = await axios({
      url: `${SHAKEDOWN_URL}/payouts`,
      method: 'get',
      json: true,
      withCredentials: true
    });
    let { data } = res
    dispatch({
      type: SET_PAYMENTS,
      payload: data
    });
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_PAYMENTS]: (state, action) => {
    return {
      ...state,
      payments: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  payments: []
};

export default function paymentsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
