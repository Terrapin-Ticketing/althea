import React from 'React'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

let Wrapper = ({ className, children, style }) => <div className={className} style={style}>{children}</div>

Wrapper.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
}

Wrapper = styled(Wrapper)`
${p => p.flexBox && css`
    flex: 1;
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
  ${p => p.paddingFull && css`
    padding: 1rem;
  `}
  ${p => p.paddingFullSmall && css`
    padding: .25rem;
  `}
  ${p => p.paddingNone && css`
    padding: 0;
  `}
  ${p => p.paddingHeight && css`
    padding-top: 1rem;
    padding-bottom: 1rem;
   `}
  ${p => p.paddingHeightLarge && css`
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  `}
  ${p => p.paddingWidth && css`
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  `}
  ${p => p.marginTop && css`
    margin-top: 25px;
   `}
  ${p => p.marginBottom && css`
    margin-bottom: 25px;
  `}
  ${p => p.marginFull && css`
    margin: 25px;
  `}
  ${p => p.centered && css`
    align-items: center;
    justify-content: center;
   `}
  ${p => p.alignCenter && css`
    align-items: center;
  `}
  ${p => p.borderRadius && css`
    border-radius: 4px;
  `}
  ${p => p.boxShadow && css`
    box-shadow: 0 1px 46px -4px rgba(0,0,0,.28);
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
  ${p => p.fontMed && css`
    font-size: 80%;
  `}
  ${p => p.fullWidth && css`
    width: 100%;
  `}
`

export default Wrapper
