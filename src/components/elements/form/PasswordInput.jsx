import React from 'React'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { gray400 } from 'styles/colors'
const RawInput = styled.input`

&::-webkit-input-placeholder {
  color: ${gray400};
}
`

const PasswordInput = ({ input, ...rest }) =>
  <div className='form-group'>
    <RawInput {...input} placeholder={rest.label} type='password' className='form-control' />
  </div>

PasswordInput.propTypes = {
  input: PropTypes.object
}

export default PasswordInput
