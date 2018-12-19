import { TicketsApi } from 'api'

const GET_TICKET_SUCCESS = 'GET_TICKET_SUCCESS'
const GET_TICKET_REQUEST = 'GET_TICKET_REQUEST'
const RESERVE_TICKET_SUCCESS = 'RESERVE_TICKET_SUCCESS'
const GET_TICKET_FAILURE = 'GET_TICKET_FAILURE'
const UNRESERVE_TICKET_SUCCESS = 'UNRESERVE_TICKET_SUCCESS'
const UNRESERVE_TICKET_FAILURE = 'UNRESERVE_TICKET_FAILURE'

export function getTicket(_id) {
  return async (dispatch) => {
    try {
      dispatch(getTicketRequest())
      let { data: { ticket } } = await TicketsApi.getTicketById(_id)
      dispatch(getTicketSuccess(ticket))
    } catch(e) {
      dispatch(getTicketFailure(e.response.data))
    }
  }
}

export function reserveTicket(_id) {
  return async (dispatch) => {
    try {
      dispatch(getTicketRequest())
      let { data: { ticket, reserveToken } } = await TicketsApi.reserveTicket(_id)
      dispatch(reserveTicketSuccess(ticket, reserveToken))
    } catch(e) {
      dispatch(getTicketFailure(e.response.data))
    }
  }
}

export function deleteReserveToken(ticketId, reserveToken) {
  return async (dispatch) => {
    try {
      await TicketsApi.unreserveTicket(ticketId, reserveToken);
      dispatch(unreserveTicketSuccess())
    } catch(e) {
      dispatch(unreserveTicketFailure(e.response.data))
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

const reserveTicketSuccess = (ticket, token) => {
  return {
    type: RESERVE_TICKET_SUCCESS,
    payload: {
      ticket: ticket,
      reserveToken: token
    }
  }
}

const getTicketFailure= (error) => {
  return {
    type: GET_TICKET_FAILURE,
    payload: {
      error: error,
      loading: false
    }
  }
}

const unreserveTicketSuccess = () => {
  return {
    type: UNRESERVE_TICKET_SUCCESS,
  }
}

const unreserveTicketFailure = () => {
  return {
    type: UNRESERVE_TICKET_FAILURE
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
  [RESERVE_TICKET_SUCCESS]: (state, action) => {
    return {
      ...state,
      ticket: action.payload.ticket,
      reserveToken: action.payload.reserveToken,
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
  },
  [UNRESERVE_TICKET_SUCCESS]: (state) => {
    return {
      ...state,
      ticket: null,
      reserveToken: null,
      loading: true,
      error: null
    }
  },
}

const initialState = {
  ticket: null,
  reserveToken: null,
  error: null,
  loading: true
}

export default function ticketReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
