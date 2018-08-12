import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

import { Container, TicketCard, Wrapper } from 'components/blocks'
import TransferTicketForm from 'components/forms/TransferTicket'
import { H1, H3, H5, Text, Button, Loading, Error, Success } from 'components/elements'

const SellTicket = ({ ticket, error, loading, transferSuccess, user }) =>
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  : <Container paddingTop>
  {!transferSuccess ? (
      <Wrapper flexBox flexColumn>
        <H1 style={{ marginBottom: 0 }}>Transfer Ticket</H1>
        <H5 subtle>{user.email}</H5>
        <Wrapper flexBox flexColumn textCenter>
          <TicketCard ticket={ticket} event={ticket.eventId} showActions={false} showBarcode={true} style={{ marginBottom: '2.5rem' }} />
          <H3 style={{ marginBottom: 0 }}>{`Recipient's Information`}</H3>
          <Text subtle marginBottom>{`Type in the information for the fan you wish to transfer this ticket to.`}</Text>
          <TransferTicketForm ticket={ticket} />
        </Wrapper>
      </Wrapper>
    ) : (
      <Wrapper flexBox flexColumn>
        <H3 style={{ marginBottom: 0 }}>Success!</H3>
        <Text subtle marginBottom>{`You just transfered ${ticket.ownerId.email} a ${ticket.type} ticket to ${ticket.eventId.name}.`}</Text>
        <Success />
        <Button primary action={() => browserHistory.push('wallet')}>Go back to Wallet</Button>
      </Wrapper>
    )}
    </Container>

SellTicket.propTypes = {
  ticket: PropTypes.object,
  user: PropTypes.object.isRequired,
  transferSuccess: PropTypes.bool,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default SellTicket
