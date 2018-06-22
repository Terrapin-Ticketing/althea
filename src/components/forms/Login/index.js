import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { FormWrapper, TextInput, PasswordInput } from 'components/elements/form'
import { Button } from 'components/elements'
import { Alert } from 'components/blocks'

let LoginForm = ({ handleSubmit, login, submitting, afterLogin, error }) => {
  return (
    <FormWrapper onSubmit={handleSubmit((values) => login(values, afterLogin))}>
      {error && <Alert danger>{error}</Alert>}
      <Field name='email' label='Email' component={TextInput} />
      <Field name='password' label='Password' component={PasswordInput}/>
      <Button type='submit' className='btn-primary' disabled={submitting}>Login</Button>
    </FormWrapper>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  afterLogin: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.object
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
