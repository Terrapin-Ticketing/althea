import axios from 'axios'

class EventApi {
  async getEvents() {
    return axios({
      url: `${SHAKEDOWN_URL}/events`,
      method: 'get',
      json: true,
      withCredentials: true
    })
  }

  async getEventByUrlSafe(urlSafe) {
    return axios({
      url: `${SHAKEDOWN_URL}/events?urlSafe=${urlSafe}`,
      method: 'get',
      json: true,
      withCredentials: true
    })
  }
}

export default new EventApi()
