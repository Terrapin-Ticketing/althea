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
export const validateTicketRequest = (barcode) => {
  return {
    type: 'VALIDATE_TICKET_REQUEST',
    payload: {
      barcode
    }
  }
}

export const validateTicketSuccess = (ticket) => {
  return {
    type: 'VALIDATE_TICKET_SUCCESS',
    payload: {
      ticket
    }
  }
}

export const activateTicketRequest= () => {
  return {
    type: 'ACTIVATE_TICKET_REQUEST',
    payload: {
      loading: true,
      error: null
    }
  }
}

export const activateTicketSuccess = () => {
  return {
    type: 'ACTIVATE_TICKET_SUCCESS',
    payload: {
      loading: true,
      error: null
    }
  }
}

export const activateTicketFailure = (err) => {
  return {
    type: 'ACTIVATE_TICKET_FAILURE',
    payload: {
      loading: true,
      error: err
    }
  }
}