import React from 'react'
import { reduxForm, Field, SubmissionError } from 'redux-form';

const onSubmit = async (signup, afterSignup, values) => {
  try {
    await signup(values);
    afterSignup();
  } catch (err) {
    throw new SubmissionError({ _error: err.message });
  }
};

const validate = (data) => {
  let errors = {};
  if (!data.email) {
    errors.email = 'Required';
  }
  if (!data.password) {
    errors.email = 'Required';
  }
  if (!data.confirmPassword) {
    errors.email = 'Required';
  }
  if (data.password !== data.confirmPassword) {
    errors.confimPassword = 'Confirm password doesn\'t match password'
  }

  return errors;
};

const RenderInput = ({input, meta, ...rest}) =>
  <div className="input-field col s12">
    <label className={(input.value !== '') && 'active'} data-error={meta.error}>{rest.label}</label>
    <input {...input} type='text' className='validate' />
    <span className="helper-text">{rest.helperText}</span>
  </div>

const RenderPassword = ({input, meta, ...rest}) =>
  <div className="input-field col s12">
    <label className={(input.value !== '') && 'active'} data-error={meta.error}>{rest.label}</label>
    <input {...input} type='password' className='validate' />
    <span className="helper-text">{rest.helperText}</span>
  </div>


let SignupForm = ({ handleSubmit, signup, afterSignup, submitting, error }) =>
  <form className='login-form' style={{display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center'}} onSubmit= {handleSubmit((values) => onSubmit(signup, afterSignup, values))}>
    <Field name='email' label='Email' component={RenderInput} />
    <Field name='password' label='Password' component={RenderPassword} />
    <Field name='confirmPassword' label='Confirm Password' component={RenderPassword} />
    {(error) && (<div className='error'>{error}</div>)}
    <div className='submit-row'>
      <button className='btn-large terrapin-green center-align' type='submit' disabled={submitting}>Signup</button>
    </div>
  </form>;

SignupForm = reduxForm({
  form: 'signupForm',
  validate
})(SignupForm);

export default SignupForm;
