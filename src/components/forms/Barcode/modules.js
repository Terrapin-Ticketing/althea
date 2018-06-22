import { EventsApi } from 'api'
import * as actions from 'actions'
import { SubmissionError } from 'redux-form'

export const validateTicket = (urlSafe, { barcode }, afterValidation ) => {
  return async (dispatch) => {
    try {
      // dispatch(actions.validateTicketRequest())
      const res = await EventsApi.validateTicket(urlSafe, barcode)
      const { data: { ticket } } = res
      dispatch(actions.validateTicketSuccess(ticket))
      afterValidation()
    } catch(e) {
      // dispatch(actions.validateTicketFailure(e.response.data))
      throw new SubmissionError({ _error: e.response.data })
    }
  }
}
