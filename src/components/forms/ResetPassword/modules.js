import { UsersApi } from 'api'
import { SubmissionError } from 'redux-form'
import * as authActions from 'store/authentication'

export const resetPassword = ({ password }, resetToken, afterResetPassword) => {
  return async (dispatch) => {
    try {
      const res = await UsersApi.resetPassword(password, resetToken)
      let { data: { token } } = res
      dispatch(authActions.setUserFromToken(token))
      afterResetPassword()
    } catch(e) {
      throw new SubmissionError({ _error: e.response.data })
    }
  }
}
