import React from 'react'
import styled from 'styled-components'

import { H2 } from 'components/elements'

const ErrorContainer = styled.div`
  display: 'flex';
  height: '100%';
`

const ErrorImage = styled.img`
  display: 'flex';
  flex: 1;
  justify-self: 'center';
  align-self: 'center';
  height: 250;
  width: 250;
`

const ErrorText = styled.div``

const Error = (error) =>
  <ErrorContainer>
    <ErrorImage src='layouts/PageLayout/assets/spinner-green.svg' />
    <ErrorText>
      <H2>Oops, something went wrong!</H2>
      <p>{error}</p>
    </ErrorText>
  </ErrorContainer>

export default Error
