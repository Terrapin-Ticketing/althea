import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { FormWrapper, TextInput } from 'components/elements/form'
import { Button, Loading } from 'components/elements'
import { Alert } from 'components/blocks'

let ResetPasswordForm = ({ handleSubmit, resetPassword, submitting, afterResetPassword, error, token }) => {
  return (
    <FormWrapper onSubmit={handleSubmit((values) => resetPassword(values, token, afterResetPassword))}>
      {error && <Alert danger>{error}</Alert>}
      <Field name='password' label='Password' component={TextInput} />
      <Field name='confirmPassword' label='Confirm Password' component={TextInput} />
      {!submitting && <Button type='submit' className='btn-primary' disabled={submitting}>Reset Password</Button>}
      {submitting && <Loading />}
    </FormWrapper>
  )
}

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  afterResetPassword: PropTypes.func,
  submitting: PropTypes.bool,
  token: PropTypes.string.isRequired,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

ResetPasswordForm = connect(mapStateToProps, require('./modules'))(ResetPasswordForm)

ResetPasswordForm = reduxForm({
  form: 'setPasswordForm'
})(ResetPasswordForm)

export default ResetPasswordForm
