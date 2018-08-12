import TicketApi from 'api/tickets'
import { SubmissionError } from 'redux-form'

export const transferTicket = ({ firstName, lastName, email }, ticketToTransfer) => {
  return async (dispatch) => {
    try {
      let res = await TicketApi.transferTicket(firstName, lastName, email, ticketToTransfer)
      let { data: { ticket } } = res
      dispatch(transferTicketSuccess(ticket))
    } catch(e) {
      throw new SubmissionError({ _error: e.response.data })
    }
  }
}

export const transferTicketSuccess = (ticket) => {
  return {
    type: 'TRANSFER_TICKET_SUCCESS',
    payload: {
      ticket
    }
  }
}
