import axios from 'axios'

export const login = ({ email, password }) => {
  return async (dispatch) => {
    let { res: { data: { token } } } = await axios({
      url: `${SHAKEDOWN_URL}/login`,
      method: 'post',
      data: { email, password },
      withCredentials: true
    })

    dispatch({
      type: 'LOGIN',
      payload: token
    })
  }
}
