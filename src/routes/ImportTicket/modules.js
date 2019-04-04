import { EventsApi } from 'api'
import * as actions from 'actions'

const SET_CURRENT_EVENT = 'SET_CURRENT_EVENT'
const GO_TO_STEP = 'GO_TO_STEP'
const VALIDATE_TICKET_SUCCESS = 'VALIDATE_TICKET_SUCCESS'
const VALIDATE_TICKET_REQUEST = 'VALIDATE_TICKET_REQUEST'
const ACTIVATE_TICKET_REQUEST = 'ACTIVATE_TICKET_REQUEST'
const ACTIVATE_TICKET_SUCCESS = 'ACTIVATE_TICKET_SUCCESS'
const ACTIVATE_TICKET_FAILURE = 'ACTIVATE_TICKET_FAILURE'

export function getEventInfo(urlSafe) {
  return async (dispatch) => {
    let { data: { events } } = await EventsApi.getEventByUrlSafe(urlSafe)
    dispatch(actions.setCurrentEvent(events[0]))
  }
}

export function activateTicket({ urlSafe, barcode, email }) {
  return async (dispatch) => {
    try {
      dispatch(actions.activateTicketRequest(barcode))
      let { data: { ticket } } = await EventsApi.activateTicket(urlSafe, barcode, email)
      dispatch(actions.activateTicketSuccess(ticket))
    } catch(e) {
      dispatch(actions.activateTicketFailure(e.response.data))
    }
  }
}

export function goToStep(step) {
  return async (dispatch) => {
    dispatch({
      type: GO_TO_STEP,
      payload: step
    })
  }
}

const ACTION_HANDLERS = {
  [SET_CURRENT_EVENT]: (state, action) => {
    return {
      ...state,
      currentEvent: action.payload,
      isLoading: false
    }
  },
  [GO_TO_STEP]: (state, action) => {
    return {
      ...state,
      step: action.payload,
      error: null
    }
  },
  [VALIDATE_TICKET_SUCCESS]: (state, action) => {
    return {
      ...state,
      tickets: action.payload.tickets
    }
  },
  [VALIDATE_TICKET_REQUEST]: (state, action) => {
    return {
      ...state,
      barcode: action.payload.barcode
    }
  },
  [ACTIVATE_TICKET_REQUEST]: (state, action) => {
    return {
      ...state,
      barcode: action.payload.barcode,
      activateTicketLoading: true,
      error: null
    }
  },
  [ACTIVATE_TICKET_SUCCESS]: (state, action) => {
    return {
      ...state,
      ticket: action.payload.ticket,
      error: null,
      activateTicketLoading: false,
      step: 5
    }
  },
  [ACTIVATE_TICKET_FAILURE]: (state, action) => {
    return {
      ...state,
      error: action.payload.error,
      activateTicketLoading: false
    }
  }
}

const initialState = {
  isLoading: true,
  error: false,
  step: 1,
  currentEvent: {},
  ticket: null,
  barcode: null,
  activateTicketLoading: false
}

export default function eventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
