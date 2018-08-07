import React from 'react'
import PropTypes from 'prop-types'

import { Container, TicketCard, Wrapper } from 'components/blocks'
import { H1, H4, Loading, Error } from 'components/elements'

const Wallet = ({ ticket, error, loading }) =>
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  : <Container paddingTop>
      <Wrapper flexBox flexColumn>
        <H1>My Ticket</H1>
        <H4>View and manage your concert tickets</H4>
        <Wrapper>
          <Wrapper flexBox flexColumn>
            <TicketCard ticket={ticket} event={ticket.eventId} />
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
