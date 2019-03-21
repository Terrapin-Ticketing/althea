import React from 'React'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { getPadding, getMargin, getWidth } from 'styles/spacing'

let Wrapper = ({ className, children, style }) => <div className={className} style={style}>{children}</div>

Wrapper.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
}

Wrapper = styled(Wrapper)`
  padding: ${ p => getPadding(p)}
  margin: ${ p => getMargin(p)}
  max-width: ${p => getWidth(p)}
  ${p => p.flexBox && css`
    display: flex;
   `}
  ${p => p.flexColumn && css`
    flex-direction: column;
   `}
  ${p => p.flexRow && css`
    flex-direction: row;
  `}
  ${p => p.flexRowLarge && css`
    @media (min-width: 768px) {
      flex-direction: row;
    }
  `}
  ${p => p.spaceAround && css`
    justify-content: space-around;
  `}
  ${p => p.spaceBetween && css`
    justify-content: space-between;
  `}
  ${p => p.fullScreen && css`
    min-height: 0;
    flex: 1 1 0;
  `}
  ${p => p.textCenter && css`
    text-align: center;
  `}
  ${p => p.centered && css`
    align-items: center;
    justify-content: center;
   `}
  ${p => p.selfCentered && css`
   align-self: center;
   justify-self: center;
  `}
  ${p => p.alignCenter && css`
    align-items: center;
  `}
  ${p => p.borderRadius && css`
    border-radius: 4px;
  `}
  ${p => p.boxShadow && css`
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, .2);
  `}
  ${p => p.borderFull && css`
    border: 1px solid #f0f1f2;
  `}
  ${p => p.borderTop && css`
    border-top: 1px solid #f0f1f2;
  `}
  ${p => p.borderBottom && css`
    border-bottom: 1px solid #f0f1f2;
  `}
  ${p => p.borderRight && css`
    border-right: 1px solid #f0f1f2;
  `}
  ${p => p.borderLeft && css`
    border-left: 1px solid #f0f1f2;
  `}
  ${p => p.fullWidth && css`
    width: 100%;
  `}
`

export default Wrapper
