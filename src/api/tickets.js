import axios from 'axios'

class TicketsApi {
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
}

export default new TicketsApi()
