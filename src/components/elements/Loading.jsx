import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LoadingContainer = styled.div`
  display: flex;
  height: 100%;
`

const LoadingImage = styled.img`
  display: flex;
  flex: 1;
  justify-self: center;
  align-self: center;
  height: 250;
  width: 250;
`

const Loader = ({ color }) =>
  <LoadingContainer>
    {color === 'white' ? <LoadingImage src={require('assets/spinner-white.svg')} />
    : <LoadingImage src={require('assets/spinner-green.svg')} />}
  </LoadingContainer>

Loader.propTypes = {
  color: PropTypes.string
}


export default Loader
