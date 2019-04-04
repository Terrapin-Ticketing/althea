import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper, TicketCard } from 'components/blocks'
import { Text, Button } from 'components/elements'

import { spacing13 } from 'styles/spacing'

const ActivateSuccess = ({ tickets, activateAnotherTicket }) =>
  <Wrapper style={{ width: spacing13 }}>
    <Wrapper>
      <Text center>Congratulations!</Text>
    </Wrapper>
    {tickets.map((ticket) => {
      return <p key={ticket.id}>{ticket}</p>
      // return <TicketCard key= event={ticket.event} ticket={ticket} showActions={true} />
    })}
    <Wrapper paddingFull>
      <Button primaryGreen padding4x4 action={() => activateAnotherTicket()}>Activate Another Ticket</Button>
    </Wrapper>
  </Wrapper>

ActivateSuccess.propTypes = {
  tickets: PropTypes.array.isRequired,
  activateAnotherTicket: PropTypes.func
}

export default ActivateSuccess
