import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';

export function getTransactions(id) {
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
    let transactions = [
      {
        _id: 'i123',
        date: '12/23/17',
        price: 1200,
        ticketType: 'General Admission',
        ticketId: 't123abc',
        recipient: 'jerrygarcia@gmail.com',
        sender: 'randomFan1@gmail.com',
      },
      {
        _id: 'i123',
        date: '12/23/17',
        price: 1200,
        ticketType: 'General Admission',
        ticketId: 't123abc',
        recipient: 'bobwe1r@gmail.com',
        sender: 'randomFan1@gmail.com',
      },
      {
        _id: 'i123',
        date: '12/23/17',
        price: 1200,
        ticketType: 'General Admission',
        ticketId: 't123abc',
        recipient: 'phillesh13@gmail.com',
        sender: 'randomFan1@gmail.com',
      },
      {
        _id: 'i123',
        date: '12/23/17',
        price: 1200,
        ticketType: 'General Admission',
        ticketId: 't123abc',
        recipient: 'treyanastasio@yahoo.com',
        sender: 'randomFan1@gmail.com',
      },
      {
        _id: 'i123',
        date: '12/23/17',
        price: 1200,
        ticketType: 'General Admission',
        ticketId: 't123abc',
        recipient: 'cactusgordon@gmail.com',
        sender: 'randomFan1@gmail.com',
      },
    ];


    dispatch({
      type: SET_TRANSACTIONS,
      payload: transactions
    });
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_TRANSACTIONS]: (state, action) => {
    return {
      ...state,
      transactions: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  transactions: []
};

export default function transactionsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
