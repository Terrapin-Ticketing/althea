import TicketApi from 'api/tickets'
import UserApi from 'api/users'
import * as authActions from 'store/authentication'
import { SubmissionError } from 'redux-form'

export const sellTicket = (ticketForSale, { payoutMethod, payoutValue, price }) => {
  return async (dispatch, getState) => {
    try {
      let { data: { ticket } } = await TicketApi.sellTicket(price, ticketForSale)
      let { data: { token } } = await UserApi.updateUser(getState().auth.user._id, { payout: { default: payoutMethod, [payoutMethod]: payoutValue } })
      console.log('sellTicket: ', ticket)
      dispatch(sellTicketSuccess(ticket))
      dispatch(authActions.setUserFromToken(token))
    } catch(e) {
      throw new SubmissionError({ _error: e.response.data })
    }
  }
}

export const unsellTicket = (ticketForSale) => {
  return async (dispatch) => {
    try {
      console.log('ticketForSale: ', ticketForSale);
      let { data: { ticket } } = await TicketApi.unsellTicket(ticketForSale)
      console.log('unsellTicket: ', ticket)
      dispatch(sellTicketSuccess(ticket))
    } catch(e) {
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
