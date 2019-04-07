import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { TicketCard } from 'components/blocks'
import { Loading, Error } from 'components/elements'

import { spacing5 } from 'styles/spacing'

const Wallet = ({ tickets, error, loading, user }) => {
  console.log('tickets, error, loading, user: ', tickets, error, loading, user);
  return (
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  : ( <PageContainer>
        <EventWrapper>
          {tickets.map((ticket) =>
            <TicketCard key={ticket._id} ticket={ticket} event={ticket.event} showActions={true} />
          )}
        </EventWrapper>
      </PageContainer>
    )
  );
}

const PageContainer = styled.div`
  margin: 0 auto;
`;

const EventWrapper = styled.div`
  display: grid;
  max-width: 1280px;
  margin-top: ${spacing5};
  grid-gap: 25px;
  padding: 0 ${spacing5};
`;


Wallet.propTypes = {
  tickets: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default Wallet
