import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'

import './SignupForm.scss'

const onSubmit = async (signup, afterSignup, values) => {
  await signup(values)
  afterSignup()
}

const validate = (data) => {
  let errors = {}
  if (!data.email) {
    errors.email = 'Required'
  }
  if (!data.password) {
    errors.email = 'Required'
  }
  if (!data.confirmPassword) {
    errors.email = 'Required'
  }
  if (data.password !== data.confirmPassword) {
    errors.confimPassword = 'Confirm password doesn\'t match password'
  }

  return errors
}

const RenderInput = ({ input, meta, ...rest }) =>
  <div className='form-group'>
    <input {...input} type='text' placeholder={rest.label} className='form-control' />
    <span className='helper-text'>{rest.helperText}</span>
  </div>

RenderInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

const RenderPassword = ({ input, meta, ...rest }) =>
  <div className='form-group'>
    <input {...input} type='password' placeholder={rest.label} className='form-control' />
    <span className='helper-text'>{rest.helperText}</span>
  </div>

RenderPassword.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

let SignupForm = ({ handleSubmit, signup, afterSignup, submitting }) =>
  <form className='signup-form' onSubmit={handleSubmit((values) => onSubmit(signup, afterSignup, values))}>
    <Field name='email' label='Email' component={RenderInput} />
    <Field name='password' label='Password' component={RenderPassword} />
    <Field name='confirmPassword' label='Confirm Password' component={RenderPassword} />

    <div>
      <button type='submit' className='btn btn-primary' disabled={submitting}>Sign Up</button>
    </div>
  </form>

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  afterSignup: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

SignupForm = reduxForm({
  form: 'signupForm',
  validate
})(SignupForm)

export default SignupForm
