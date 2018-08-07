import React from 'react'
import PropTypes from 'prop-types'

import { Container, TicketCard } from 'components/blocks'
import { H1, H4, Loading, Error } from 'components/elements'

const Wallet = ({ tickets, error, loading }) =>
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  : <Container column paddingTop flexBox>
      <H1>My Wallet</H1>
      <H4>View and manage your concert tickets</H4>
      <Container>
        {tickets.map((ticket) =>
          <TicketCard key={ticket._id} ticket={ticket} event={ticket.event} />
        )}
      </Container>
    </Container>

Wallet.propTypes = {
  tickets: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default Wallet
