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

  async forgotPassword(email) {
    return axios({
      url: `${SHAKEDOWN_URL}/set-password`, //eslint-disable-line no-undef
      method: 'post',
      data: {
        email
      },
      json: true,
      withCredentials: true
    })
  }

  async resetPassword(password, token) {
    return axios({
      url: `${SHAKEDOWN_URL}/set-password/${token}`, //eslint-disable-line no-undef
      method: 'post',
      data: {
        password
      },
      json: true,
      withCredentials: true
    })
  }

  async updateUser(userId, updatedProps) {
    return axios({
      url: `${SHAKEDOWN_URL}/users/${userId}`, //eslint-disable-line no-undef
      method: 'put',
      data: updatedProps,
      json: true,
      withCredentials: true
    })
  }
}

export default new UsersApi()
