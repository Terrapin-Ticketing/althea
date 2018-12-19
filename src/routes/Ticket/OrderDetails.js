import React from 'react'
import PropTypes from 'prop-types'

import { Container, Wrapper } from 'components/blocks'
import { Price } from 'components/elements'

// TODO: figure out how we are calculating service fee
const calculateCardFee = (price) => ((price * 0.029) + 50);
const calculateServiceFee = () => 500;
const calculateTotal = (ticketPrice, serviceFee, cardFee) => ticketPrice + serviceFee + cardFee;

const Wallet = ({ ticket }) =>
  <Container paddingTop>
      <Wrapper flexBox flexColumn>
        <Wrapper>
          <Wrapper flexBox flexColumn>
            <table className='table'>
							<thead>
								<tr>
									<th>Item</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{ticket.eventId.name} <br />{ticket.type}</td>
									<td><Price price={ticket.price} /></td>
								</tr>
								<tr>
									<td>Service Fee</td>
									<td><Price price={calculateServiceFee(ticket.price)} /></td>
								</tr>
								<tr>
									<td>Credit Card Processing</td>
									<td><Price price={calculateCardFee(ticket.price + calculateServiceFee())} /></td>
								</tr>
								<tr>
									<td>Total</td>
									<td><Price price={calculateTotal(ticket.price, calculateServiceFee(), calculateCardFee(ticket.price + calculateServiceFee()))} /></td>
								</tr>
							</tbody>
            </table>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Container>

Wallet.propTypes = {
  ticket: PropTypes.object,
  event: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default Wallet
