import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper, Alert, TicketCard } from 'components/blocks'
import { Text, Button, H4, H1, Loading } from 'components/elements'

const ConfirmActivation = ({ activateTicket, user, ticket, event, error, loading }) =>
  <Wrapper textCenter flexBox flexColumn>
    <H4 subtle>Activate Ticket</H4>
    <H1>Add ticket to wallet</H1>
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
