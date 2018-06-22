import React from 'React'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

let Alert = ({ className, children, style }) => <div className={`${className} alert`} style={style}>{children}</div>

Alert.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
}

Alert = styled(Alert)`
  ${p => p.primary && css`
			color: #0a4f1e;
			background-color: #d0ead7;
			border-color: #bde2c8;
	 `}
	 ${p => p.danger && css`
			color: #721c24;
			background-color: #f8d7da;
			border-color: #f5c6cb;
	`}
	${p => p.warning && css`
			color: #856404;
			background-color: #fff3cd;
			border-color: #ffeeba;
   `}
`

export default Alert
