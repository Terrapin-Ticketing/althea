import React from 'React'
import PropTypes from 'prop-types'

const SelectInput = ({ input, ...rest, options }) =>
  <div className='form-group'>
    <select {...input} disabled={rest.disabled} className={`form-control`}>
      {options.map((option) => {
        return <option key={option.toLowerCase()} value={option.toLowerCase()}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
      })}
    </select>
  </div>

SelectInput.propTypes = {
  input: PropTypes.object,
  options: PropTypes.array.isRequired,
  meta: PropTypes.object
}

export default SelectInput
