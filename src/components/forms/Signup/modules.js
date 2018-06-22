import UsersApi from 'api/users'
import * as authActions from 'store/authentication'
import { SubmissionError } from 'redux-form'

export const signup = ({ email, password, confirmPassword }, afterSignup) => {
  return async (dispatch) => {
    if (password !== confirmPassword) { throw new SubmissionError({ _error: 'Your passwords don\'t match. Please double check and resubmit your signup request.' }) } // eslint-disable-line max-len
    try {
      let res = await UsersApi.signup(email, password)
      let { data: { token } } = res
      dispatch(authActions.setUserFromToken(token))
      afterSignup()
    } catch(e) {
      throw new SubmissionError({ _error: e.response.data })
    }
  }
}
