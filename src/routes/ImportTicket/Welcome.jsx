import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from 'components/blocks'
import { H2, H4, Image, Button } from 'components/elements'

const Welcome = ({ event, nextStep }) =>
  <Wrapper textCenter>
    <Wrapper>
      <H2 center>{event.name}</H2>
      <H4 textGray center>Official Ticket Transfer and Resale Marketplace</H4>
      <Wrapper paddingFull><Button className='btn-outline-primary btn-lg' action={() => nextStep()}>Get Started</Button></Wrapper>
    </Wrapper>
  </Wrapper>

Welcome.propTypes = {
  event: PropTypes.object.isRequired,
  nextStep: PropTypes.func
}

export default Welcome
