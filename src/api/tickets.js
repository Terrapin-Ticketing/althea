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
}

export default new TicketsApi()
