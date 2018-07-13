import { TicketsApi } from 'api'
import * as actions from 'actions'

const GET_USER_TICKETS_REQUEST = 'GET_USER_TICKETS_REQUEST'
const GET_USER_TICKETS_SUCCESS = 'GET_USER_TICKETS_SUCCESS'
const GET_USER_TICKETS_FAILURE = 'GET_USER_TICKETS_FAILURE'

export function getUserTickets(_id) {
  return async (dispatch) => {
    try {
      dispatch(actions.getUserTicketsRequest())
      console.log('id: ', _id)
      let { data: { tickets } } = await TicketsApi.getTicketsByUserId(_id)
      dispatch(actions.getUserTicketsSuccess(tickets))
    } catch(e) {
      console.log('e: ', e.response.message)
      console.log('eeeee: ', e.response.data)
      dispatch(actions.getUserTicketsFailure(e.response.data))
    }
  }
}

const ACTION_HANDLERS = {
  [GET_USER_TICKETS_REQUEST]: (state) => {
    return {
      ...state,
      loading: false,
      error: null
    }
  },
  [GET_USER_TICKETS_SUCCESS]: (state, action) => {
    return {
      ...state,
      tickets: action.payload.tickets,
      loading: false,
      error: null
    }
  },
  [GET_USER_TICKETS_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    }
  }
}

const initialState = {
  tickets: [],
  error: null,
  loading: true
}

export default function walletReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
