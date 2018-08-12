import { UsersApi } from 'api'
import { SubmissionError } from 'redux-form'

export const forgotPassword = ({ email }, afterForgotPassword) => {
  return async () => {
    try {
      await UsersApi.forgotPassword(email)
      afterForgotPassword()
    } catch(e) {
      throw new SubmissionError({ _error: e.response.data })
    }
  }
}
