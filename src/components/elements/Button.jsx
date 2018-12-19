import React from 'React'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { getPadding, getMargin } from 'styles/spacing'
import { base500 } from 'styles/colors'

let Button = ({ action, children, className, type, style }) =>
  <button 
  type={type} 
  style={style} 
  className={`${className || ''}`} 
  onClick={action}>{children}</button>

Button.propTypes = {
  children: PropTypes.string.isRequired,
  action: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

Button = styled(Button)`
   cursor: pointer;
   margin-bottom: 12px;
   padding: ${ p => getPadding(p)}
   margin: ${ p => getMargin(p)}
   border-radius: 4px;
   box-shadow: 0 1px 3px hsla(0, 0%, 0%, .2);
   
   ${p => p.primary && css`
     color: #fff;
     background-color: ${base500};
     border-color: ${base500};
   `}
   ${p => p.primaryOutline && css`
    color: #28a745;
    background-color: transparent;
    background-image: none;
    border-color: #28a745;
   `}
   ${p => p.danger && css`
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
   `}
   ${p => p.dangerOutline && css`
    color: #dc3545;
    background-color: transparent;
    background-image: none;
    border-color: #dc3545;
   `}
   ${p => p.subtleOutline && css`
   border-color: #c4c4c4;;
  `}
   ${p => p.block && css`
     width: 100%;
     display: block;
   `}
   ${p => p.marginTop && css`
     margin-top: 15px;
   `}

   @media (min-width: 768px) {
     margin-bottom: 0px;
   }
`

export default Button
