import React from 'react'
import { reduxForm, Field, SubmissionError } from 'redux-form';


const onSubmit = async (login, afterLogin, values) => {
  try {
    await login(values);
    afterLogin();
  } catch (err) {
    console.log('err: ', err.message);
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


let LoginForm = ({ handleSubmit, login, afterLogin, submitting, error }) =>
  <form className='login-form' style={{display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center'}} onSubmit= {handleSubmit((values) => onSubmit(login, afterLogin, values))}>
    <Field name='email' label='Email' component={RenderInput} />
    <Field name='password' label='Password' component={RenderPassword} />
    {(error) && (<div className='error'>{error}</div>)}
    <div className='submit-row'>
      <button className='btn-large terrapin-green center-align' type='submit' disabled={submitting}>Login</button>
    </div>
  </form>;

LoginForm = reduxForm({
  form: 'loginForm',
  validate
})(LoginForm);

export default LoginForm;
