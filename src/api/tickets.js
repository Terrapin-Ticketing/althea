import axios from 'axios'

class TicketsApi {
  async getTicketById(_id) {
    return axios({
      url: `${SHAKEDOWN_URL}/tickets/${_id}`, //eslint-disable-line no-undef
      method: 'get',
      json: true,
      withCredentials: true
    })
  }

  async getTicketsByUserId(_id) {
    return axios({
      url: `${SHAKEDOWN_URL}/tickets?ownerId=${_id}`, //eslint-disable-line no-undef
      method: 'get',
      json: true,
      withCredentials: true
    })
  }

  async getAvailableByEventId(_id) {
    return axios({
      url: `${SHAKEDOWN_URL}/tickets?eventId=${_id}`, //eslint-disable-line no-undef
      method: 'get',
      json: true,
      withCredentials: true
    })
  }

  async transferTicket(firstName, lastName, email, ticket) {
    return axios({
      url: `${SHAKEDOWN_URL}/tickets/${ticket._id}/transfer`, //eslint-disable-line no-undef
      method: 'post',
      data: {
        transferToUser: {
          firstName,
          lastName,
          email
        }
      },
      json: true,
      withCredentials: true
    })
  }

  async buyTicket(ticket, token, transferToUser, reserveToken) {
    console.log('ticket, token, transferToUser, reserveToken: ', ticket, token, transferToUser, reserveToken)
    return axios({
      url: `${SHAKEDOWN_URL}/payment/${ticket._id}`, //eslint-disable-line no-undef
      method: 'post',
      data: {
        token,
        transferToUser,
        reserveToken
      },
      json: true,
      withCredentials: true
    })
  }

  async reserveTicket(ticketId) {
    return axios({
      url: `${SHAKEDOWN_URL}/tickets/${ticketId}/reserve`, //eslint-disable-line no-undef
      method: 'get',
      json: true,
      withCredentials: true
    })
  }

  async unreserveTicket(ticketId, reserveToken) {
    return axios({
      url: `${SHAKEDOWN_URL}/tickets/${ticketId}/reserve?reserveToken=${reserveToken}`, //eslint-disable-line no-undef
      method: 'delete',
      json: true,
      withCredentials: true
    })
  }

  async sellTicket(price, ticketForSale) {
    return axios({
      url: `${SHAKEDOWN_URL}/tickets/${ticketForSale._id}`, //eslint-disable-line no-undef
      method: 'put',
      data: {
        price,
        isForSale: true
      },
      json: true,
      withCredentials: true
    })
  }

  async unsellTicket(ticketForSale) {
    return axios({
      url: `${SHAKEDOWN_URL}/tickets/${ticketForSale._id}`, //eslint-disable-line no-undef
      method: 'put',
      data: {
        isForSale: false,
        price: ticketForSale.price
      },
      json: true,
      withCredentials: true
    })
  }
}

export default new TicketsApi()
