import axios from 'axios';

const DISPLAY_TRANSFER_TICKET_MODAL = 'DISPLAY_TRANSFER_TICKET_MODAL';

export const transferTicket = (ticketId, transferToUser) => {
  return async (dispatch, getState) => {
    await axios({
      url: `${SHAKEDOWN_URL}/tickets/${ticketId}/transfer`,
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

    dispatch({
      type: 'SET_USER_TICKETS',
      payload: tickets
    });
  };
};

export const openTransferTicketModal = () => {
  return (dispatch, getState) => {
    dispatch({
      type: DISPLAY_TRANSFER_TICKET_MODAL,
      payload: true
    });
  };
};

export const closeTransferTicketModal = () => {
  return (dispatch, getState) => {
    dispatch({
      type: DISPLAY_TRANSFER_TICKET_MODAL,
      payload: false
    });
  };
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DISPLAY_TRANSFER_TICKET_MODAL]: (state, action) => {
    return {
      ...state,
      isOpen: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isOpen: false
};
export default function transferTicketModalReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
