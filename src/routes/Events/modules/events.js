import axios from 'axios'

export const SET_EVENTS = 'SET_EVENTS'

export function getEvents() {
  return async(dispatch) => {
    let res = await axios({
      url: `${SHAKEDOWN_URL}/events/find`,
      method: 'post',
      json: true,
      data: {},
      withCredentials: true
    })

    let { data: { events } } = res
    console.log('events: ', events)

    dispatch({
      type: SET_EVENTS,
      payload: events
    })
  }
}

const ACTION_HANDLERS = {
  [SET_EVENTS]: (state, action) => {
    return {
      ...state,
      events: action.payload
    }
  }
}

const initialState = {
  events: []
}

export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
