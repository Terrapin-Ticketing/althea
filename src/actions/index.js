// Events
export const setEvents = (events) => ({
  type: 'SET_EVENTS',
  payload: events
})

export const setCurrentEvent = (event) => ({
  type: 'SET_CURRENT_EVENT',
  payload: event
})

// Tickets
export const validateTicketSuccess = (ticket) => {
  return {
    type: 'VALIDATE_TICKET_SUCCESS',
    payload: {
      ticket
    }
  }
}