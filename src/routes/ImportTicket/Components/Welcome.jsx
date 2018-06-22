import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from 'components/blocks'
import { H2, H4, Button, Image } from 'components/elements'

const Welcome = ({ event, nextStep }) =>
  <Wrapper textCenter flexColumn paddingFull>
      <Wrapper style={{ flex: 2, display: 'flex', padding: '1rem' }}><Image src={event.imageUrl} /></Wrapper>
      <Wrapper flexColumn>
        <H2 center style={{ flex: 1 }}>{event.name}</H2>
        <H4 textGray center style={{ flex: 1 }}>Official Ticket Transfer and Resale Marketplace</H4>
        <Button  style={{ flex: 1 }} className='btn-primary btn-lg' action={nextStep}>Get Started</Button>
      </Wrapper>
  </Wrapper>

Welcome.propTypes = {
  event: PropTypes.object.isRequired,
  nextStep: PropTypes.func
}

export default Welcome
