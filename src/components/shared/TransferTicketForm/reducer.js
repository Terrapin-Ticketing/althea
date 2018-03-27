import axios from 'axios';

export const transferTicket = (ticket, transferToUser) => {
  console.log('hits transferTicket function: ', ticket._id, transferToUser);
  return async (dispatch, getState) => {
    console.log('after return async');
    await axios({
      url: `${SHAKEDOWN_URL}/tickets/${ticket._id}/transfer`,
      method: 'post',
      data: {
        transferToUser: transferToUser
      },
      withCredentials: true
    });

    let { tickets } = (await axios({
      url: `${SHAKEDOWN_URL}/tickets/find`,
      method: 'post',
      data: {
        query: {
          ownerId: getState().auth.user._id
        }
      },
      withCredentials: true
    })).data;

    console.log('afterTransfer: ', tickets);

    dispatch({
      type: 'SET_USER_TICKETS',
      payload: tickets
    });
  };
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { };
export default function transferTicketFormReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
