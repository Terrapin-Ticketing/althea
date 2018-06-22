import React from 'React'
import PropTypes from 'prop-types'

const PasswordInput = ({ input, ...rest }) =>
  <div className='form-group'>
    <input {...input} placeholder={rest.label} type='password' className='form-control' />
  </div>

PasswordInput.propTypes = {
  input: PropTypes.object
}

export default PasswordInput
