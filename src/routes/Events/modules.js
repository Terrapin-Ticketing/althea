import { EventsApi } from 'api'
import * as actions from 'actions'

export const SET_EVENTS = 'SET_EVENTS'
export const SET_ERROR = 'SET_ERROR'

export function getAllEvents() {
  return async(dispatch) => {
    let { data: { events } } = await EventsApi.getEvents()
    dispatch(actions.setEvents(events))
  }
}

const ACTION_HANDLERS = {
  [SET_EVENTS]: (state, action) => {
    return {
      ...state,
      events: action.payload,
      loading: false
    }
  },
  [SET_ERROR]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      loading: false
    }
  }
}

const initialState = {
  events: [],
  error: false,
  loading: true
}

export default function eventsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
