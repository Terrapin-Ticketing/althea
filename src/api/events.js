import axios from 'axios'

class EventsApi {
  async getEvents() {
    return axios({
      url: `${SHAKEDOWN_URL}/events`, //eslint-disable-line no-undef
      method: 'get',
      json: true,
      withCredentials: true
    })
  }

  async getEventByUrlSafe(urlSafe) {
    return axios({
      url: `${SHAKEDOWN_URL}/events?urlSafe=${urlSafe}`, //eslint-disable-line no-undef
      method: 'get',
      json: true,
      withCredentials: true
    })
  }

  async validateTicket(urlSafe, orderId) {
    return axios({
      // url: `${SHAKEDOWN_URL}/${urlSafe}/validate`, //eslint-disable-line no-undef
      url: `${SHAKEDOWN_URL}/${urlSafe}/orderId/validate`, //eslint-disable-line no-undef
      method: 'post',
      data: {
        orderId
      },
      json: true,
      withCredentials: true
    })
  }

  async activateTicket(urlSafe, barcode, email) {
    return axios({
      url: `${SHAKEDOWN_URL}/${urlSafe}/activate`, //eslint-disable-line no-undef
      method: 'post',
      data: {
        barcode,
        email
      },
      json: true,
      withCredentials: true
    })
  }
}

export default new EventsApi()
