import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper, Alert, TicketCard } from 'components/blocks'
import { Text, Button, Loading } from 'components/elements'

const ConfirmActivation = ({ activateTicket, user, ticket, event, error, loading }) =>
  <Wrapper textCenter flexBox flexColumn>
    <Text subtle>Activate Ticket</Text>
    <Text>Add ticket to wallet</Text>
    <Wrapper paddingFull>
      <TicketCard event={event} ticket={ticket} showActions={false} />
    </Wrapper>
    <Wrapper paddingFull>
      {(error) && <Alert danger>{error}</Alert>}
      {loading ? <Text subtle small>Adding ticket to <strong>{user.email}'s wallet</strong></Text>
      : <Text subtle small>Signed in as <strong>{user.email}</strong></Text>}
      <Wrapper paddingFull>{loading ?  <Loading /> : <Button block className='btn-primary btn-lg' action={activateTicket}>Add Ticket to Wallet</Button>}</Wrapper>
    </Wrapper>
  </Wrapper>

ConfirmActivation.propTypes = {
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  activateTicket: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default ConfirmActivation
