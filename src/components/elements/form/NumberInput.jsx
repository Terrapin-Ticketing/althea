import React from 'React'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { gray400 } from 'styles/colors'
const RawInput = styled.input`

&::-webkit-input-placeholder {
  color: ${gray400};
}
`

let NumberInput = ({ input, meta: { touched, error }, ...rest }) =>
  <div className={`form-group ${rest.className}`}>
    <RawInput {...input} disabled={rest.disabled} placeholder={rest.label} type='number' pattern='[0-9]*' inputmode='numeric' autoFocus className={`form-control ${touched && error && 'is-invalid'}`} />
  </div>

NumberInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}



export default NumberInput
