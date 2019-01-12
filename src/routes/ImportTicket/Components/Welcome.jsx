import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from 'components/blocks'
import { Text, Button, Image } from 'components/elements'

const Welcome = ({ event, nextStep }) =>
  <Wrapper flexBox textCenter flexColumn centered>
      <Wrapper style={{ height: 256 }}>
        <Image src={event.imageUrl} style={{ width: '100%', maxHeight: '100%' }} />
      </Wrapper>
      <Wrapper flexColumn spaceAround paddingFull>
        <Text center>{event.name}</Text>
        <Text textGray center>Official Ticket Transfer and Resale Marketplace</Text>
        <Button block className='btn-primary btn-lg' action={nextStep}>Get Started</Button>
      </Wrapper>
  </Wrapper>

Welcome.propTypes = {
  event: PropTypes.object.isRequired,
  nextStep: PropTypes.func
}

export default Welcome
