import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

let H1 = ({ className, style, children }) => <h1 className={className} style={style}>{children}</h1>

H1.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
}

H1 = styled(H1)`
  text-align: ${p => p.center ? 'center' : p.right ? 'right' : 'left'}
  color: ${p => p.green ? '#149739' : p.grey ? '#737373' : p.subtle ? '#bbb' : '#484848'}
`

export default H1
