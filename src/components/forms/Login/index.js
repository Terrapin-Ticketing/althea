import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { FormWrapper, TextInput, PasswordInput } from 'components/elements/form'
import { Button } from 'components/elements'

const onSubmit = async (login, values, afterLogin) => {
  await login(values)
  afterLogin()
}

const validate = (data) => {
  let errors = {}
  if (!data.email) {
    errors.email = 'Required'
  }
  if (!data.password) {
    errors.email = 'Required'
  }

  return errors
}

let LoginForm = ({ handleSubmit, login, submitting, values, afterLogin }) =>
  <FormWrapper onSubmit={handleSubmit((values) => onSubmit(login, values, afterLogin))}>
    <Field name='email' label='Email' component={TextInput} />
    <Field name='password' label='Password' component={PasswordInput} />
    <Button type='submit' className='btn-primary' disabled={submitting}>Login</Button>
  </FormWrapper>

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  afterLogin: PropTypes.func.isRequired
}

LoginForm = connect(() => { return { } }, require('./modules'))(LoginForm)

LoginForm = reduxForm({
  form: 'loginForm',
  validate
})(LoginForm)

export default LoginForm
