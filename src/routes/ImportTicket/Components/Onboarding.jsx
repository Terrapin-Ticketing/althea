import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from 'components/blocks'
import { H4, H5, Button } from 'components/elements'

const Onboarding = ({ event, nextStep }) =>
  <Wrapper textCenter>
    <Wrapper>
      <H4>Add tickets to your wallet so you can...</H4>
      <Wrapper marginTop>
        <Wrapper centered><H5><i style={{ marginRight: 5 }} className='fas fa-archive' />Store Tickets</H5></Wrapper>
        <Wrapper centered><H5><i style={{ marginRight: 5 }} className='fas fa-paper-plane' /> Transfer Tickets</H5></Wrapper>
        <Wrapper centered><H5><i style={{ marginRight: 5 }} className='fas fa-money-bill-alt' /> Sell Tickets</H5></Wrapper>
      </Wrapper>
      <Wrapper paddingFull flexColumn>
        <Button className='btn-primary btn-lg' action={nextStep}>Continue</Button>
      </Wrapper>
    </Wrapper>
  </Wrapper>

Onboarding.propTypes = {
  event: PropTypes.object.isRequired,
  nextStep: PropTypes.func
}

export default Onboarding
