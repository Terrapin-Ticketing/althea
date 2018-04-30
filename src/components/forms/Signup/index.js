import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { FormWrapper, TextInput, PasswordInput } from 'components/elements/form'
import { Button } from 'components/elements'

const onSubmit = async (signup, values) => {
  await signup(values)
  browserHistory.push('/events')
}

const validate = (data) => {
  let errors = {}
  if (!data.email) {
    errors.email = 'Required'
  }
  if (!data.password) {
    errors.email = 'Required'
  }
  if (data.password !== data.confirmPassword) {
    errors.email = 'Required'
  }

  return errors
}

let SignupForm = ({ handleSubmit, signup, submitting }) =>
  <FormWrapper onSubmit={handleSubmit((values) => onSubmit(signup, values))}>
    <Field name='email' label='Email' component={TextInput} />
    <Field name='password' label='Password' component={PasswordInput} />
    <Field name='confirmPassword' label='Confirm Password' component={PasswordInput} />
    <Button type='submit' className='btn-primary' disabled={submitting}>Signup</Button>
  </FormWrapper>

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

SignupForm = connect(() => { return { } }, require('./modules'))(SignupForm)

SignupForm = reduxForm({
  form: 'signupForm',
  validate
})(SignupForm)

export default SignupForm
