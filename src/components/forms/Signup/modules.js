import { UsersApi } from 'api'
import * as actions from 'actions'

export const signup = ({ email, password }) => {
  return async (dispatch) => {
    let res = await UsersApi.signup(email, password)
    let { data: { token } } = res
    dispatch(actions.login(token))
  }
}
