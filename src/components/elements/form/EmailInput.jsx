import React from 'React'
import PropTypes from 'prop-types'

const EmailInput = ({ input, meta: { touched, error }, ...rest }) =>
  <div className='form-group'>
    <input {...input} disabled={rest.disabled} placeholder={rest.label} type='email' className={`form-control ${touched && error && 'is-invalid'}`} />
  </div>

EmailInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

export default EmailInput
