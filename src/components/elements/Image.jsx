import React from 'React'
import PropTypes from 'prop-types'
import styled from 'styled-components'

let Image = ({ src, className, style }) => <img src={src} className={className} style={style} />

Image.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
}

Image = styled(Image).attrs({
  className: 'img-fluid'
})`
width: ${p => p.fullWidth ? '100%' : 'auto'}
`

export default Image
