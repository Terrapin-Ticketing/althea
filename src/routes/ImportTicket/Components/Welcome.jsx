import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from 'components/blocks'
import { Text, Button, Image } from 'components/elements'

import { white } from 'styles/colors'; 

const Welcome = ({ event, nextStep }) =>
  <Wrapper flexBox textCenter flexColumn centered>
    <Wrapper>
        <Wrapper><Text gray500 fontSize8 fontWeight500>Official Ticket Exchange</Text></Wrapper>
        <Wrapper><Text gray400 fontSize2 fontWeight100>powered by Terrapin Ticketing</Text></Wrapper>
    </Wrapper>
    <Wrapper flexColumn spaceAround padding5x5 margin5x0 borderFull borderRadius boxShadow style={{ background: white }}>
      <Wrapper style={{ height: 256 }}>
        <Image src={event.imageUrl} style={{ width: '100%', maxHeight: '100%' }} />
      </Wrapper>
        {/* <Wrapper><Text>{event.name}</Text></Wrapper> */}
      <Button style={{ marginTop: 15 }} padding4x5 primaryGreen action={nextStep}>
        <Text fontSize5 white>Get Started</Text>
      </Button>
      </Wrapper>
  </Wrapper>

Welcome.propTypes = {
  event: PropTypes.object.isRequired,
  nextStep: PropTypes.func
}

export default Welcome
