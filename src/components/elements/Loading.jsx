import React from 'react'
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

const Loader = () =>
  <LoadingContainer>
    <LoadingImage src={require('assets/spinner-green.svg')} />
  </LoadingContainer>

export default Loader
