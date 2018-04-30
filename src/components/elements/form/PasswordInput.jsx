import React from 'React'
import PropTypes from 'prop-types'

const PasswordInput = ({ input, meta, ...rest }) =>
  <div className='form-group'>
    <input {...input} placeholder={rest.label} type='password' className='form-control' />
    <span className='helper-text'>{rest.helperText}</span>
  </div>

PasswordInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

export default PasswordInput
