import axios from 'axios'

class UsersApi {
  async login(email, password) {
    return axios({
      url: `${SHAKEDOWN_URL}/login`, //eslint-disable-line no-undef
      method: 'post',
      data: {
        email,
        password
      },
      json: true,
      withCredentials: true
    })
  }

  async signup(email, password) {
    return axios({
      url: `${SHAKEDOWN_URL}/signup`, //eslint-disable-line no-undef
      method: 'post',
      data: {
        email,
        password
      },
      json: true,
      withCredentials: true
    })
  }
}

export default new UsersApi()
