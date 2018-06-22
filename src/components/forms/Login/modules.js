import { UsersApi } from 'api'
import * as authActions from 'store/authentication'
import { SubmissionError } from 'redux-form'

export const login = ({ email, password }, afterLogin) => {
  return async (dispatch) => {
    try {
      let res = await UsersApi.login(email, password)
      let { data: { token } } = res
      dispatch(authActions.setUserFromToken(token))
      afterLogin()
    } catch(e) {
      throw new SubmissionError({ _error: e.response.data })
    }
  }
}
