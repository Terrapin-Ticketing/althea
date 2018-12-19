import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { FormWrapper, TextInput, PasswordInput } from 'components/elements/form'
import { Button, Loading } from 'components/elements'
import { Alert } from 'components/blocks'

let LoginForm = ({ handleSubmit, login, submitting, afterLogin, error }) => {
  return (
    <FormWrapper onSubmit={handleSubmit((values) => login(values, afterLogin))}>
      {error && <Alert danger>{error}</Alert>}
      <Field name='email' label='Email' component={TextInput} />
      <Field name='password' label='Password' component={PasswordInput}/>
      {!submitting && <Button type='submit' primary padding3x3 disabled={submitting}>Login</Button>}
      {(submitting) && <Loading />}
    </FormWrapper>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  afterLogin: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

LoginForm = connect(mapStateToProps, require('./modules'))(LoginForm)

LoginForm = reduxForm({
  form: 'loginForm'
})(LoginForm)

export default LoginForm
