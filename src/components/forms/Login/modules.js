import { UsersApi } from 'api'
import * as actions from 'actions'

export const login = ({ email, password }) => {
  return async (dispatch) => {
    let res = await UsersApi.login(email, password)
    let { data: { token } } = res
    dispatch(actions.login(token))
  }
}
