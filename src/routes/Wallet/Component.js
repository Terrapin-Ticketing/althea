import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import numwords from 'num-words';

import { TicketCard, Wrapper } from 'components/blocks'
import { Loading, Error, Text } from 'components/elements'

import { base200, base300 } from 'styles/colors'
import { spacing4, spacing5, spacing6 } from 'styles/spacing'

const Wallet = ({ tickets, error, loading, user }) => {
  console.log('tickets, error, loading, user: ', tickets, error, loading, user);
  return (
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  : ( <PageContainer>
      <Wrapper flexBox spaceBetween flexWrap>
        <Text fontSize7 gray600>Wallet</Text>
        <InfoBox>
          <Text fontSize2 gray600>
          {`There ${(tickets.length === 0 || tickets.length > 1) ? 'are' : 'is'} ${numwords(tickets.length)} ticket${(tickets.length === 0 || tickets.length > 1) ? 's' : ''} in your wallet`}
          </Text><br />
          {/* <Text fontSize2 gray600></Text> */}
        </InfoBox>
      </Wrapper>
      
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
  width: 100%;
  margin: 0 auto;
  padding: ${spacing6} ${spacing6}
`;

const EventWrapper = styled.div`
  display: grid;
  justify-content: center;
  max-width: 1280px;
  margin: 0 auto;
  
  margin-top: ${spacing5};
  grid-gap: 25px;
  padding: 0 ${spacing5};
`;

const InfoBox = styled.div`
  padding: ${spacing4} ${spacing6};
  border: 1px solid ${base300};
  background: ${base200};
`;


Wallet.propTypes = {
  tickets: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default Wallet
