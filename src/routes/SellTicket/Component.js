import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { browserHistory } from 'react-router'

import { TicketCard, Wrapper } from 'components/blocks'
// import SellTicketForm from 'components/forms/SellTicket'
import { Text, Button, Loading, Error, Success } from 'components/elements'

import { spacing6 } from 'styles/spacing'

const SellTicket = ({ ticket, error, loading, markForSaleSuccess, user }) => {
  console.log('ticket, error, loading, markForSaleSuccess, user: ', ticket, error, loading, markForSaleSuccess, user);
  return (
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  : <SellTicketContainer>
  {!markForSaleSuccess ? (
      <Wrapper flexBox flexColumn paddingFull>
        <Text fontSize7 gray600>Sell Ticket</Text>
       {user.email}
        <Wrapper flexBox flexColumn textCenter>
          <TicketCard ticket={ticket} event={ticket.eventId} showActions={false} showBarcode={true} style={{ marginBottom: '2.5rem' }} />
            <Text>Fill out some information about the price of your ticket and where to send money once it sells.</Text>
            {/* <SellTicketForm ticket={ticket} /> */}
        </Wrapper>
      </Wrapper>
    ) : (
      <Wrapper flexBox flexColumn>
        Success!
        <Text>{`You just marked your ${ticket.type} ticket to ${ticket.eventId.name} for sale.`}</Text>
        <Success />
        <Button primary action={() => browserHistory.push(`/${ticket.eventId.urlSafe}/ticket/${ticket._id}`)}>View your listing</Button>
      </Wrapper>
    )}
    </SellTicketContainer>
  )
}

const SellTicketContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: ${spacing6} ${spacing6}
`;

SellTicket.propTypes = {
  ticket: PropTypes.object,
  user: PropTypes.object.isRequired,
  markForSaleSuccess: PropTypes.bool,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default SellTicket
