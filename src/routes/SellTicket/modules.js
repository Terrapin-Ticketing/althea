import { TicketsApi } from 'api'

const GET_TICKET_REQUEST = 'GET_TICKET_REQUEST'
const GET_TICKET_SUCCESS = 'GET_TICKET_SUCCESS'
const GET_TICKET_FAILURE = 'GET_TICKET_FAILURE'
const SELL_TICKET_SUCCESS = 'SELL_TICKET_SUCCESS'
const RESET_SELL_TICKET_STATE = 'RESET_SELL_TICKET_STATE'

export function getTicket(_id) {
  return async (dispatch) => {
    try {
      dispatch(getTicketRequest())
      let { data: { ticket } } = await TicketsApi.getTicketById(_id)
      dispatch(getTicketSuccess(ticket))
    } catch(e) {
      dispatch(getTicketFailure(e))
    }
  }
}

export function resetState() {
  return (dispatch) => {
    dispatch(resetSellTicketState(initialState))
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

const getTicketFailure = (error) => {
  console.log('getTicketFailure: ', error)
  return {
    type: GET_TICKET_FAILURE,
    payload: {
      error: error
    }
  }
}

const resetSellTicketState = (initialState) => {
  return {
    type: RESET_SELL_TICKET_STATE,
    payload: initialState
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
  },
  [SELL_TICKET_SUCCESS]: (state, action) => {
    return {
      ...state,
      ticket: action.payload.ticket,
      markForSaleSuccess: true,
      loading: false,
      error: null
    }
  },
  [RESET_SELL_TICKET_STATE]: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  }
}

const initialState = {
  ticket: null,
  markForSaleSuccess: false,
  error: null,
  loading: true
}

export default function transferTicketReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
