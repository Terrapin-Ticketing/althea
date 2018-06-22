import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

let H5 = ({ className, style, children }) => <h5 className={className} style={style}>{children}</h5>

H5.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
}

H5 = styled(H5)`
  text-align: ${p => p.center ? 'center' : p.right ? 'right' : 'left'}
  ${p => p.textGray && css`
    color: rgb(115, 115, 115);
   `}
`

export default H5
