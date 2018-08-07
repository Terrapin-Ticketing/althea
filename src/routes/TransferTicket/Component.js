import React from 'react'
import PropTypes from 'prop-types'

import { Container, TicketCard, Wrapper } from 'components/blocks'
import TransferTicketForm from 'components/forms/TransferTicket'
import { H1, Loading, Error, Button } from 'components/elements'

const Wallet = ({ ticket, error, loading }) =>
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  : <Container paddingTop>
      <Wrapper flexBox flexColumn>
        <H1>Transfer Ticket</H1>
        <Wrapper>
          <Wrapper flexBox flexColumn textCenter>
            <TicketCard ticket={ticket} event={ticket.eventId} />
            <TransferTicketForm ticket={ticket} />
            <Button label='Get Started' />
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Container>

Wallet.propTypes = {
  ticket: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default Wallet
