import React from 'React'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = styled.a.attrs({
  className: 'btn-flat waves-effect'
})`
  cursor: pointer;
  color: #ffab40;
`

const ActionButton = ({ label, action }) =>
  <Button onClick={action}>{label}</Button>

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
}

export default ActionButton
