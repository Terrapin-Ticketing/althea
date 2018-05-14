const DISPLAY_PAYOUT_MODAL = 'DISPLAY_PAYOUT_MODAL';

export const openPayoutModal = (payout) => {
  return (dispatch, getState) => {
    dispatch({
      type: DISPLAY_PAYOUT_MODAL,
      payload: {
        isOpen: true,
        payout: payout
      }
    });
  };
};

export const closePayoutModal = () => {
  return (dispatch, getState) => {
    dispatch({
      type: DISPLAY_PAYOUT_MODAL,
      payload: {
        isOpen: false,
        payout: null
      }
    });
  };
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DISPLAY_PAYOUT_MODAL]: (state, action) => {
    return {
      ...state,
      isOpen: action.payload.isOpen,
      payout: action.payload.payout
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isOpen: false,
  payout: null
};
export default function payoutModalReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
