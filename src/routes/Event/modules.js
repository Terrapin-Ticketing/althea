import { EventsApi } from 'api'
import * as actions from 'actions'

const SET_CURRENT_EVENT = 'SET_CURRENT_EVENT'

export function getEventInfo(urlSafe) {
  return async (dispatch, getState) => {
    let { data: { events } } = await EventsApi.getEventByUrlSafe(urlSafe)
    dispatch(actions.setCurrentEvent(events[0]))
  }
}

const ACTION_HANDLERS = {
  [SET_CURRENT_EVENT]: (state, action) => {
    return {
      ...state,
      currentEvent: action.payload,
      loading: false
    }
  }
}

const initialState = {
  currentEvent: {},
  error: false,
  loading: true
}

export default function eventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
