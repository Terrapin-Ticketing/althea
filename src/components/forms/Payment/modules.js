import TicketApi from 'api/tickets'
import { SubmissionError } from 'redux-form'

export const buyTicket = ({ firstName, lastName, email }, availableTicket, reserveToken, stripe) => {
  return async (dispatch) => {
    try {
      console.log('ticket: ', firstName, lastName, email, availableTicket, reserveToken, stripe)
      const stripeToken = await stripe.createToken({ name: `${firstName} ${lastName}` })
      console.log('stripeToken: ', stripeToken)
      if (stripeToken.error) { throw new Error(stripeToken.error.message) }
      let res = await TicketApi.buyTicket(availableTicket, stripeToken, { firstName: firstName, lastName: lastName, email: email }, reserveToken)
      console.log('res: ', res);
      let { data: { ticket } } = res
      dispatch(buyTicketSuccess(ticket))
    } catch(e) {
      console.log('e: ', e)
      if (e.response && e.response.data) {
        throw new SubmissionError({ _error: e.response.data })
      } else {
        throw new SubmissionError({ _error: e.message })
      }
    }
  }
}

export const buyTicketSuccess = (ticket) => {
  return {
    type: 'BUY_TICKET_SUCCESS',
    payload: {
      ticket
    }
  }
}
