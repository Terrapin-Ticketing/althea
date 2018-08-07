import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from 'components/blocks'
import { H2, H5, Button, Image } from 'components/elements'

const Welcome = ({ event, nextStep }) =>
  <Wrapper flexBox textCenter flexColumn centered>
      <Wrapper centered className='col-xs-12 col-sm-9 col-md-6'>
        <Image src={event.imageUrl} style={{ width: '100%', maxHeight: '100%' }} />
      </Wrapper>
      <Wrapper flexColumn spaceAround paddingFull>
        <H2 center>{event.name}</H2>
        <H5 textGray center>Official Ticket Transfer and Resale Marketplace</H5>
        <Button block className='btn-primary btn-lg' action={nextStep}>Get Started</Button>
      </Wrapper>
  </Wrapper>

Welcome.propTypes = {
  event: PropTypes.object.isRequired,
  nextStep: PropTypes.func
}

export default Welcome
