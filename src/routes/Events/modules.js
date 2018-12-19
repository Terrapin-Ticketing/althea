import { EventsApi } from 'api'

export const GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST'
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS'
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE'


// Actions
const requestEvents = () => {
  return {
    type: GET_EVENTS_REQUEST
  }
}

const setEvents = (events) => {
  return {
    type: GET_EVENTS_SUCCESS,
    payload: events
  }
}

const setFailure = (error) => {
  return {
    type: GET_EVENTS_FAILURE,
    payload: error
  }
}

// Action Creators
export function getEvents() {
  return async(dispatch) => {
    dispatch(requestEvents())
    try {
      let { data: { events } } = await EventsApi.getEvents()
      console.log('events: ', events);
      dispatch(setEvents(events))
    } catch (e) {
      console.log('error: ', e.message);
      dispatch(setFailure(e))
    }
  }
}

// Reducer
const ACTION_HANDLERS = {
  [GET_EVENTS_REQUEST]: (state) => {
    return {
      ...state,
      loading: true
    }
  },
  [GET_EVENTS_SUCCESS]: (state, action) => {
    return {
      ...state,
      events: action.payload,
      error: null,
      loading: false
    }
  },
  [GET_EVENTS_FAILURE]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      loading: false
    }
  }
}

const initialState = {
  events: [],
  error: null,
  loading: true
}

export default function eventsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
