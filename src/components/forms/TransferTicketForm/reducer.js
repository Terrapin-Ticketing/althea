import axios from 'axios';

export const transferTicket = (ticket, transferToUser) => {
  return async (dispatch, getState) => {
    await axios({
      url: `${SHAKEDOWN_URL}/tickets/${ticket._id}/transfer`,
      method: 'post',
      data: {
        transferToEmail: transferToUser.email
      },
      withCredentials: true
    });

    let { tickets } = (await axios({
      url: `${SHAKEDOWN_URL}/tickets?ownerId=${getState().auth.user._id}`,
      method: 'get',
      withCredentials: true
    })).data;

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
