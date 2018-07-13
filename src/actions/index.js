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

export const activateTicketSuccess = (ticket) => {
  return {
    type: 'ACTIVATE_TICKET_SUCCESS',
    payload: {
      ticket: ticket,
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

export const getUserTicketsRequest= () => {
  return {
    type: 'GET_USER_TICKETS_REQUEST',
    payload: {
      loading: true,
      error: null
    }
  }
}

export const getUserTicketsSuccess = (tickets) => {
  return {
    type: 'GET_USER_TICKETS_SUCCESS',
    payload: {
      tickets: tickets,
      loading: true,
      error: null
    }
  }
}

export const getUserTicketsFailure = (err) => {
  return {
    type: 'GET_USER_TICKETS_FAILURE',
    payload: {
      loading: true,
      error: err
    }
  }
}