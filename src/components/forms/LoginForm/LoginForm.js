import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'

import './LoginForm.scss'

const onSubmit = async (login, afterLogin, values) => {
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

const RenderInput = ({ input, meta, ...rest }) =>
  <div className='form-group'>
    <input {...input} placeholder={rest.label} type='text' className='form-control' />
    <span className='helper-text'>{rest.helperText}</span>
  </div>

RenderInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

const RenderPassword = ({ input, meta, ...rest }) =>
  <div className='form-group'>
    <input {...input} placeholder={rest.label} type='password' className='form-control' />
    <span className='helper-text'>{rest.helperText}</span>
  </div>

RenderPassword.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

let LoginForm = ({ handleSubmit, login, afterLogin, submitting }) =>
  <form onSubmit={handleSubmit((values) => onSubmit(login, afterLogin, values))} className='login-form'>
    <Field name='email' label='Email' component={RenderInput} />
    <Field name='password' label='Password' component={RenderPassword} />
    <div>
      <button type='submit' className='btn btn-primary' disabled={submitting}>Login</button>
    </div>
  </form>

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  afterLogin: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

LoginForm = reduxForm({
  form: 'loginForm',
  validate
})(LoginForm)

export default LoginForm
