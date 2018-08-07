import { EventsApi } from 'api'
import * as actions from 'actions'
import { SubmissionError } from 'redux-form'

export const validateTicket = (urlSafe, barcode, afterValidation ) => {
  return async (dispatch) => {
    try {
      dispatch(actions.validateTicketRequest(barcode)) // store barcode in redux for activation later
      const res = await EventsApi.validateTicket(urlSafe, barcode)
      console.log('res: ', res);
      const { data: { ticket } } = res
      dispatch(actions.validateTicketSuccess(ticket))
      afterValidation()
    } catch(e) {
      throw new SubmissionError({ _error: e.response.data })
    }
  }
}
