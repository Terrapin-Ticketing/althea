import axios from 'axios'

class UsersApi {
  async login(email, password) {
    return axios({
      url: `${SHAKEDOWN_URL}/login`,
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
      url: `${SHAKEDOWN_URL}/signup`,
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
