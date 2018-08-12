import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SuccessContainer = styled.div`
  display: flex;
  height: 100%;
`

const SuccessImage = styled.img`
  display: flex;
  flex: 1;
  justify-self: center;
  align-self: center;
  height: 250px;
  width: 250px;
`

const Success = () =>
  <SuccessContainer>
    <SuccessImage src={require('assets/animated-check.svg')} />
  </SuccessContainer>

Success.propTypes = {
  color: PropTypes.string
}

export default Success
