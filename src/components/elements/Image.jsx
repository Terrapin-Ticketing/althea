import React from 'React'
import PropTypes from 'prop-types'
import styled from 'styled-components'

let EventImage = styled.img`
  max-width: 100%;
`

let Image = ({ src }) =>
  <EventImage src={src} />

Image.propTypes = {
  src: PropTypes.string.isRequired
}

export default Image
