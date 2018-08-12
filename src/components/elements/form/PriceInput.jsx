import React from 'React'
import PropTypes from 'prop-types'

const PriceInput = ({ input, meta: { touched, error }, ...rest }) =>
  <div className='form-group'>
    <input {...input} disabled={rest.disabled} placeholder={rest.label} type='tel' className={`form-control ${touched && error && 'is-invalid'}`} />
  </div>

PriceInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

export default PriceInput
