import { TicketsApi } from 'api'

const GET_TICKET_REQUEST = 'GET_TICKET_REQUEST'
const GET_TICKET_SUCCESS = 'GET_TICKET_SUCCESS'
const GET_TICKET_FAILURE = 'GET_TICKET_FAILURE'

export function getTicket(_id) {
  return async (dispatch) => {
    try {
      dispatch(getTicketRequest())
      let { data: { ticket } } = await TicketsApi.getTicketById(_id)
      dispatch(getTicketSuccess(ticket))
    } catch(e) {
      console.log('e', e);
      dispatch(getTicketFailure(e))
    }
  }
}

const getTicketRequest = () => {
  return {
    type: GET_TICKET_REQUEST
  }
}

const getTicketSuccess = (ticket) => {
  return {
    type: GET_TICKET_SUCCESS,
    payload: {
      ticket: ticket
    }
  }
}

const getTicketFailure= (error) => {
  return {
    type: GET_TICKET_FAILURE,
    payload: {
      error: error
    }
  }
}

const ACTION_HANDLERS = {
  [GET_TICKET_REQUEST]: (state) => {
    return {
      ...state,
      loading: true,
      error: null
    }
  },
  [GET_TICKET_SUCCESS]: (state, action) => {
    return {
      ...state,
      ticket: action.payload.ticket,
      loading: false,
      error: null
    }
  },
  [GET_TICKET_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    }
  }
}

const initialState = {
  ticket: null,
  error: null,
  loading: true
}

export default function ticketReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
