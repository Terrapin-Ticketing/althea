import React from 'react'
import PropTypes from 'prop-types'

import { Container, TicketCard } from 'components/blocks'
import { H1, H5, Loading, Error } from 'components/elements'

const Wallet = ({ tickets, error, loading, user }) =>
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  : <Container column paddingTop flexBox bgOffWhite>
      <H1 style={{ marginBottom: 0 }}>My Wallet</H1>
      <H5 subtle>{user.email}</H5>
      <Container column bgOffWhite>
        {tickets.map((ticket) =>
          <TicketCard key={ticket._id} ticket={ticket} event={ticket.event} showActions={true} />
        )}
      </Container>
    </Container>

Wallet.propTypes = {
  tickets: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default Wallet
