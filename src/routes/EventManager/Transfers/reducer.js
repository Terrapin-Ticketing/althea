import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_TRANSFERS = 'SET_TRANSFERS';

export function getTransfers(id) {
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
    let transfers = [
      {
        _id: 'i123',
        date: '12/23/17',
        ticketId: 't123abc',
        ticketType: 'General Admission',
        recipient: 'jerryg@gmail.com',
        sender: 'bobbyw@yahoo.com',
      },
      {
        _id: 'i123',
        date: '12/23/17',
        ticketId: 't123abc',
        ticketType: 'General Admission',
        recipient: 'wspfan4life@gmail.com',
        sender: 'cbrown@gmail.com',
      },
      {
        _id: 'i123',
        date: '12/23/17',
        ticketId: 't123abc',
        ticketType: 'General Admission',
        recipient: 'kaybesee@gmail.com',
        sender: 'tcoughlin@gmail.com',
      },
      {
        _id: 'i123',
        date: '12/23/17',
        ticketId: 't123abc',
        ticketType: 'General Admission',
        recipient: 'icculusbooks@gmail.com',
        sender: 'telagirl@gmail.com',
      },
      {
        _id: 'i123',
        date: '12/23/17',
        ticketId: 't123abc',
        ticketType: 'General Admission',
        recipient: 'tsmith@gmail.com',
        sender: 'johnpbarlow@gmail.com',
      },
    ];


    dispatch({
      type: SET_TRANSFERS,
      payload: transfers
    });
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_TRANSFERS]: (state, action) => {
    return {
      ...state,
      transfers: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  transfers: []
};

export default function transfersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
