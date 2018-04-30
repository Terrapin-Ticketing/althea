import React from 'React'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ImageContainer = styled.div`
  flex: 0;
  @media (min-width: 48em) {
    flex: 0 1;
  }
`

let ImageItem = styled.img`
  width: 100%;
`

let Image = ({ src }) =>
  <ImageContainer>
    <ImageItem src={src} />
  </ImageContainer>

Image.propTypes = {
  src: PropTypes.string.isRequired
}

export default Image
