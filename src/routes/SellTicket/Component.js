import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

import { Container, TicketCard, Wrapper } from 'components/blocks'
import SellTicketForm from 'components/forms/SellTicket'
import { H1, H3, H5, Text, Button, Loading, Error, Success } from 'components/elements'

const SellTicket = ({ ticket, error, loading, markForSaleSuccess, user }) =>
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  : <Container paddingTop>
  {!markForSaleSuccess ? (
      <Wrapper flexBox flexColumn paddingFull>
        <H1 style={{ marginBottom: 0 }}>Sell Ticket</H1>
        <H5 subtle>{user.email}</H5>
        <Wrapper flexBox flexColumn textCenter>
          <TicketCard ticket={ticket} event={ticket.eventId} showActions={false} showBarcode={true} style={{ marginBottom: '2.5rem' }} />
          <Wrapper selfCentered className='col-md-6'>
            <Text subtle marginBottom>{`Fill out some information about the price of your ticket and where to send money once it sells.`}</Text>
            <SellTicketForm ticket={ticket} />
          </Wrapper>
        </Wrapper>
      </Wrapper>
    ) : (
      <Wrapper flexBox flexColumn>
        <H3 style={{ marginBottom: 0 }}>Success!</H3>
        <Text subtle marginBottom>{`You just marked your ${ticket.type} ticket to ${ticket.eventId.name} for sale.`}</Text>
        <Success />
        <Button primary action={() => browserHistory.push(`/${ticket.eventId.urlSafe}/ticket/${ticket._id}`)}>View your listing</Button>
      </Wrapper>
    )}
    </Container>

SellTicket.propTypes = {
  ticket: PropTypes.object,
  user: PropTypes.object.isRequired,
  markForSaleSuccess: PropTypes.bool,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default SellTicket
