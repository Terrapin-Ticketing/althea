import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper, TicketCard } from 'components/blocks'
import { Text, Button } from 'components/elements'

const ActivateSuccess = ({ ticket, activateAnotherTicket }) =>
  <Wrapper textCenter flexBox flexColumn spaceAround style={{ width: '100%' }}>
    <Wrapper>
      <Text center>Congratulations!</Text>
    </Wrapper>
    <TicketCard event={ticket.event} ticket={ticket} showActions={true} />
    <Wrapper paddingFull>
      <Button primaryGreen padding4x4 action={() => activateAnotherTicket()}>Activate Another Ticket</Button>
    </Wrapper>
  </Wrapper>

ActivateSuccess.propTypes = {
  ticket: PropTypes.object.isRequired,
  activateAnotherTicket: PropTypes.func
}

export default ActivateSuccess
