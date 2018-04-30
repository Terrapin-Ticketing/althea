// EVENTS
export const setEvents = (events) => ({
  type: 'SET_EVENTS',
  payload: events
})

export const setCurrentEvent = (event) => ({
  type: 'SET_CURRENT_EVENT',
  payload: event
})

// USERS
export const login = (token) => ({
  type: 'LOGIN',
  payload: token
})
