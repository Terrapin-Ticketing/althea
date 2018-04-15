import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PAYMENTS = 'SET_PAYMENTS';

export function getPayments(id) {
  return async (dispatch, getState) => {
    // TODO: update route
    // let options = {
    //   url: `${SHAKEDOWN_URL}/events/find`,
    //   method: 'post',
    //   json: true,
    //   data: { query: { urlSafe: urlSafeName } },
    //   withCredentials: true
    // };
    // let { data: { events } } = await axios(options);
    let payments = [
      {
        _id: 'i123',
        date: '12/23/17',
        price: 15000,
        status: 'Unpaid',
        ticketId: 't123abc',
        ticketType: 'General Admission',
        recipient: 'randomUser@gmail.com',
        sender: 'randomFan1@gmail.com',
      },
      {
        _id: 'i123',
        date: '12/23/17',
        price: 15000,
        status: 'Unpaid',
        ticketId: 't123abc',
        ticketType: 'General Admission',
        recipient: 'randomUser@gmail.com',
        sender: 'randomFan1@gmail.com',
      },
      {
        _id: 'i123',
        date: '12/23/17',
        price: 15000,
        status: 'Unpaid',
        ticketId: 't123abc',
        ticketType: 'General Admission',
        recipient: 'randomUser@gmail.com',
        sender: 'randomFan1@gmail.com',
      },
      {
        _id: 'i123',
        date: '12/23/17',
        price: 15000,
        status: 'Unpaid',
        ticketId: 't123abc',
        ticketType: 'General Admission',
        recipient: 'randomUser@gmail.com',
        sender: 'randomFan1@gmail.com',
      },
      {
        _id: 'i123',
        date: '12/23/17',
        price: 15000,
        status: 'Unpaid',
        ticketId: 't123abc',
        ticketType: 'General Admission',
        recipient: 'randomUser@gmail.com',
        sender: 'randomFan1@gmail.com',
      },
    ];


    dispatch({
      type: SET_PAYMENTS,
      payload: payments
    });
  };
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
