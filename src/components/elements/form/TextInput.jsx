import React from 'React'
import PropTypes from 'prop-types'

const TextInput = ({ input, meta: { touched, error }, ...rest }) =>
  <div className='form-group'>
    <input {...input} disabled={rest.disabled} placeholder={rest.label} type='text' className={`form-control ${touched && error && 'is-invalid'}`} />
  </div>

TextInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

export default TextInput
