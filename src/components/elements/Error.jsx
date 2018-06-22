import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { H2 } from 'components/elements'
import { Wrapper } from 'components/blocks'

const ErrorImage = styled.img`
  display: flex;
  flex: 1;
  justify-self: center;
  align-self: center;
  height: 250;
  width: 250;
`

const ErrorText = styled.div``

const Error = ({ error }) =>
  <Wrapper centered flexColumn>
    <ErrorImage src={require('assets/tt-logo-grn.svg')} />
    <ErrorText>
      <H2>Oops, something went wrong!</H2>
      <p>{error}</p>
    </ErrorText>
  </Wrapper>

Error.PropTypes = {
  error: PropTypes.string
}

export default Error
