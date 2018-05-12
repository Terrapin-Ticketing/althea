import axios from 'axios';
import jwt from 'jsonwebtoken';

function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  let nameEQ = name + '=';
  let ca = document.cookie.split(';');
  for (let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export const sellTicket = (sentTicket, {payoutMethod, payoutValue, isForSale, price}) => {
  return async (dispatch, getState) => {
    let { data: { ticket } } = await axios({
      url: `${SHAKEDOWN_URL}/tickets/${sentTicket._id}`,
      method: 'put',
      data: {
        isForSale,
        price,
      },
      withCredentials: true
    });
    let { user } = getState().auth;
    let { data: { token } } = await axios({
      url: `${SHAKEDOWN_URL}/users/${user._id}`,
      method: 'put',
      data: {
        payout: {
          default: payoutMethod,
          [payoutMethod]: payoutValue
        }
      },
      withCredentials: true
    });

    let { data: { tickets } } = await axios({
      url: `${SHAKEDOWN_URL}/tickets?ownerId=${getState().auth.user._id}`,
      method: 'get',
      withCredentials: true
    });

    // set cookie
    let cookieToken = getCookie('cookieToken');
    if (!cookieToken) {
      setCookie('cookieToken', token, 2);
    }

    user = jwt.decode(token);

    dispatch({
      type: 'SET_USER_TICKETS',
      payload: tickets
    });

    dispatch({
      type: 'SET_TICKET_DETAILS',
      payload: ticket
    });

    dispatch({
      type: 'SET_USER_INFO',
      payload: user
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
