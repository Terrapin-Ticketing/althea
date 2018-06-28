import React from 'react'
import PropTypes from 'prop-types'

import TicketCard from './TicketCard'
import { Wrapper, Alert } from 'components/blocks'
import { Text, Button, H4, H1 } from 'components/elements'

const ConfirmActivation = ({ activateTicket, user, ticket, event, error }) =>
  <Wrapper textCenter>
    <Wrapper>
    <H4 subtle>Step 3</H4>
    <H1>Add ticket to wallet</H1>
    <TicketCard event={event} ticket={ticket} />
    {(error) && <Alert danger>{error}</Alert>}
    <Wrapper paddingFull><Button className='btn-primary btn-lg' action={activateTicket}>Add Ticket to Wallet</Button></Wrapper>
    <Text subtle small>Signed in as <strong>{user.email}</strong></Text>
    </Wrapper>
  </Wrapper>

ConfirmActivation.propTypes = {
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  activateTicket: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired,
  error: PropTypes.string
}

export default ConfirmActivation
