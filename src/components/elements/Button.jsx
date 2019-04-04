import React from 'React'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { getPadding, getMargin } from 'styles/spacing'
import { base500, base600, red500, yellow500, gray500 } from 'styles/colors'

let Button = ({ action, children, className, type, style }) =>
  <button 
  type={type} 
  style={style} 
  className={`${className || ''}`} 
  onClick={action}>{children}</button>

Button.propTypes = {
  children: PropTypes.any.isRequired,
  action: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

Button = styled(Button)`
   cursor: pointer;
   padding: ${ p => getPadding(p)}
   margin: ${ p => getMargin(p)}
   border-radius: 4px;
   border: none;

   &:active, &:focus {
     outline: 0;
   }
   
   ${p => p.primaryGreen && css`
     color: #fff;
     background-color: ${base500};
     border-color: ${base500};
     box-shadow: 0 1px 3px hsla(0, 0%, 0%, .2);

     &:active, &:focus {
      background-color: ${base600};
    }
   `}
   ${p => p.secondaryGreen && css`
    color: ${base500};
    background-color: transparent;
    background-image: none;
    border-color: ${base500};
   `}
   ${p => p.tertiaryGreen && css`
   color: ${base500};
   background: transparent;
 `}
 ${p => p.primaryRed && css`
     color: #fff;
     background-color: ${red500};
     border-color: ${red500};
     box-shadow: 0 1px 3px hsla(0, 0%, 0%, .2);
   `}
   ${p => p.secondaryRed && css`
    color: ${red500};
    background-color: transparent;
    background-image: none;
    border-color: ${red500};
   `}
   ${p => p.tertiaryRed && css`
   color: ${red500};
   background: transparent;
 `}
 ${p => p.primaryGray && css`
     color: #fff;
     background-color: ${gray500};
     border-color: ${gray500};
     box-shadow: 0 1px 3px hsla(0, 0%, 0%, .2);
   `}
   ${p => p.secondaryGray && css`
    color: ${gray500};
    background-color: transparent;
    background-image: none;
    border-color: ${gray500};
   `}
   ${p => p.tertiaryGray && css`
   color: ${gray500};
   background: transparent;
 `}
 ${p => p.primaryYellow && css`
     color: #fff;
     background-color: ${yellow500};
     border-color: ${yellow500};
     box-shadow: 0 1px 3px hsla(0, 0%, 0%, .2);
   `}
   ${p => p.secondaryYellow && css`
    color: ${yellow500};
    background-color: transparent;
    background-image: none;
    border-color: ${yellow500};
   `}
   ${p => p.tertiaryYellow && css`
   color: ${yellow500};
   background: transparent;
 `}
`

export default Button
