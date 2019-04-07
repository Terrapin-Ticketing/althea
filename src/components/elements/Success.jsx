import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Lottie from 'react-lottie'

import animationData from 'components/elements/success-animation.json'

const defaultOptions = {
  loop: false,
  autoplay: true, 
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};


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
  // <SuccessContainer>
  <Lottie 
    options={defaultOptions}
    height={200}
    width={200}
  />
  // </SuccessContainer>

Success.propTypes = {
  color: PropTypes.string
}

export default Success
