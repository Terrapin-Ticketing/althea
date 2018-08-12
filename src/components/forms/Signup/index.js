import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { FormWrapper, TextInput, PasswordInput } from 'components/elements/form'
import { Button, Loading } from 'components/elements'
import { Alert } from 'components/blocks'

let SignupForm = ({ handleSubmit, signup, submitting, afterSignup, error }) =>
    <FormWrapper onSubmit={handleSubmit((values) => signup(values, afterSignup))}>
      {error && <Alert danger>{error}</Alert>}
      <Field name='email' label='Email' component={TextInput} />
      <Field name='password' label='Password' component={PasswordInput}/>
      <Field name='confirmPassword' label='Confirm Password' component={PasswordInput} />
      {!submitting && <Button type='submit' className='btn-primary' disabled={submitting}>Signup</Button>}
      {submitting && <Loading />}
    </FormWrapper>

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  afterSignup: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

SignupForm = connect(mapStateToProps, require('./modules'))(SignupForm)

SignupForm = reduxForm({
  form: 'signupForm'
})(SignupForm)

export default SignupForm
