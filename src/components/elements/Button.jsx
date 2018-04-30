import React from 'React'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

let Button = ({ action, children, className }) =>
  <button type='submit' className={`btn ${className || ''}`} onClick={action}>{children}</button>

Button.propTypes = {
  children: PropTypes.string.isRequired,
  action: PropTypes.func,
  className: PropTypes.string
}

Button = styled(Button)`
   cursor: pointer;
   ${p => p.primary && css`
     color: #fff;
     background-color: #149739;
     border-color: #149739;
   `}
   ${p => p.block && css`
     width: 100%;
     display: block;
   `}
   ${p => p.marginTop && css`
     margin-top: 15px;
   `}
`

export default Button
