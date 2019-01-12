import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper, TicketCard } from 'components/blocks'
import { Text, Button } from 'components/elements'

const ActivateSuccess = ({ ticket, activateAnotherTicket }) =>
  <Wrapper textCenter flexBox flexColumn spaceAround>
    <Wrapper>
      <Text center>Congratulations!</Text>
    </Wrapper>
    <TicketCard event={ticket.event} ticket={ticket} showActions={true} />
    <Wrapper paddingFull>
      <Button primaryOutline action={() => activateAnotherTicket()}>Activate Another Ticket</Button>
    </Wrapper>
  </Wrapper>

ActivateSuccess.propTypes = {
  event: PropTypes.object.isRequired,
  ticket: PropTypes.object.isRequired,
  activateAnotherTicket: PropTypes.func
}

export default ActivateSuccess
