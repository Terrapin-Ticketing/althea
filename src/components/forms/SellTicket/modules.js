import TicketApi from 'api/tickets'
import UserApi from 'api/users'
import * as authActions from 'store/authentication'
import { SubmissionError } from 'redux-form'

export const sellTicket = (ticketForSale, { payoutMethod, payoutValue, price }) => {
  return async (dispatch, getState) => {
    try {
      let { data: { ticket } } = await TicketApi.sellTicket(price, ticketForSale)
      console.log('sellTicket ticket: ', ticket);
      let { data: { token } } = await UserApi.updateUser(getState().auth.user._id, { payoutMethod, payoutValue })
      console.log('sellTicket token: ', token);
      dispatch(authActions.setUserFromToken(token))
      dispatch(sellTicketSuccess(ticket))
    } catch(e) {
      console.log('e: ', e);
      throw new SubmissionError({ _error: e.response.data })
    }
  }
}

export const sellTicketSuccess = (ticket) => {
  return {
    type: 'SELL_TICKET_SUCCESS',
    payload: {
      ticket
    }
  }
}
