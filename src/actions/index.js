// Events
export const setEvents = (events) => {
  return {
    type: 'SET_EVENTS',
    payload: events
  }
}

export const setCurrentEvent = (event) => {
  return {
    type: 'SET_CURRENT_EVENT',
    payload: event
  }
}

// Tickets
export const validateTicketRequest = (barcode) => {
  return {
    type: 'VALIDATE_TICKET_REQUEST',
    payload: {
      barcode
    }
  }
}

export const validateTicketSuccess = (tickets) => {
  return {
    type: 'VALIDATE_TICKET_SUCCESS',
    payload: {
      tickets
    }
  }
}

export const activateTicketRequest= (barcode) => {
  return {
    type: 'ACTIVATE_TICKET_REQUEST',
    payload: {
      barcode: barcode,
      loading: true,
      error: null
    }
  }
}

export const activateTicketSuccess = (tickets) => {
  return {
    type: 'ACTIVATE_TICKET_SUCCESS',
    payload: {
      tickets: tickets,
      loading: false,
      error: null
    }
  }
}

export const activateTicketFailure = (err) => {
  return {
    type: 'ACTIVATE_TICKET_FAILURE',
    payload: {
      loading: false,
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