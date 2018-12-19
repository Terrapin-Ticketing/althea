import React from 'react'
import PropTypes from 'prop-types'
import { Elements } from 'react-stripe-elements'

import { Container, TicketCard, Wrapper } from 'components/blocks'
import { Text, Loading, Error } from 'components/elements'

import OrderDetails from './OrderDetails'
import PaymentForm from 'components/forms/Payment'

const Ticket = ({ ticket, reserveToken, error, loading }) =>
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  : <Container paddingTop>
      <Wrapper flexBox flexColumn>
        <Text fontSize7>{ticket.type}</Text>
        <Text fontSize5>{ticket.eventId.name}</Text>
        <Wrapper>
          <Wrapper flexBox flexColumn>
            <TicketCard ticket={ticket} event={ticket.eventId} showActions={false} showBarcode={!ticket.isForSale} />
            {(ticket.isForSale) && (
            <Wrapper paddingHeight flexBox className='row'>
              <Wrapper className='col-xs-12 col-md-6'>
                <Text fontSize5>Order Details</Text>
                <OrderDetails ticket={ticket} />
              </Wrapper>
              <Wrapper className='col-xs-12 col-md-6'>
                <Text fontSize5>Payment Information</Text>
                <Elements>
                  <PaymentForm ticket={ticket} reserveToken={reserveToken} />
                </Elements>
              </Wrapper>
            </Wrapper>
            )}
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Container>

Ticket.propTypes = {
  ticket: PropTypes.object,
  reserveToken: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default Ticket
