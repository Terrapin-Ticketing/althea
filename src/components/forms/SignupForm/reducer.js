import axios from 'axios'

export const signup = ({ email, password }) => {
  return async(dispatch) => {
    let { res: { data: { token } } } = await axios({
      url: `${SHAKEDOWN_URL}/signup`,
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
