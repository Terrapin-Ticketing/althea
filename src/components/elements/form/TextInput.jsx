import React from 'React'
import PropTypes from 'prop-types'

const TextInput = ({ input, meta, ...rest }) =>
  <div className='form-group'>
    <input {...input} placeholder={rest.label} type='text' className='form-control' />
    <span className='helper-text'>{rest.helperText}</span>
  </div>

TextInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

export default TextInput
