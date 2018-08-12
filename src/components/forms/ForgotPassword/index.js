import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { FormWrapper, TextInput } from 'components/elements/form'
import { Button, Loading } from 'components/elements'
import { Alert } from 'components/blocks'

let ForgotPasswordForm = ({ handleSubmit, forgotPassword, submitting, afterForgotPassword, error }) => {
  return (
    <FormWrapper onSubmit={handleSubmit((values) => forgotPassword(values, afterForgotPassword))}>
      {error && <Alert danger>{error}</Alert>}
      <Field name='email' label='Email' component={TextInput} />
      {!submitting && <Button type='submit' className='btn-primary' disabled={submitting}>Request new password</Button>}
      {submitting && <Loading />}
    </FormWrapper>
  )
}

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  afterForgotPassword: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

ForgotPasswordForm = connect(mapStateToProps, require('./modules'))(ForgotPasswordForm)

ForgotPasswordForm = reduxForm({
  form: 'forgotPasswordForm'
})(ForgotPasswordForm)

export default ForgotPasswordForm
