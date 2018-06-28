import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from 'components/blocks'
import { H2, H5, Button } from 'components/elements'

const Welcome = ({ event, nextStep }) =>
  <Wrapper textCenter flexColumn paddingFull>
      <Wrapper style={{ flex: 1, display: 'flex', padding: '1rem', backgroundImage: `url(${event.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <Wrapper flexColumn paddingFull>
        <H2 center>{event.name}</H2>
        <H5 textGray center>Official Ticket Transfer and Resale Marketplace</H5>
        <Button  className='btn-primary btn-lg' action={nextStep}>Get Started</Button>
      </Wrapper>
  </Wrapper>

Welcome.propTypes = {
  event: PropTypes.object.isRequired,
  nextStep: PropTypes.func
}

export default Welcome
