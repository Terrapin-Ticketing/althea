import { EventsApi } from 'api'
import * as actions from 'actions'

const SET_CURRENT_EVENT = 'SET_CURRENT_EVENT'
const GO_TO_STEP = 'GO_TO_STEP'
const VALIDATE_TICKET_SUCCESS = 'VALIDATE_TICKET_SUCCESS'

export function getEventInfo(urlSafe) {
  return async (dispatch) => {
    let { data: { events } } = await EventsApi.getEventByUrlSafe(urlSafe)
    dispatch(actions.setCurrentEvent(events[0]))
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
      loading: false
    }
  },
  [GO_TO_STEP]: (state, action) => {
    return {
      ...state,
      step: action.payload
    }
  },
  [VALIDATE_TICKET_SUCCESS]: (state, action) => {
    return {
      ...state,
      ticket: action.payload.ticket
    }
  },
}

const initialState = {
  loading: true,
  error: false,
  step: 'welcome',
  currentEvent: {},
  ticket: null
}

export default function eventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
