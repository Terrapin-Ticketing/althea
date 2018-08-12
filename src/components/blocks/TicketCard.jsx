import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment';
import { browserHistory } from 'react-router'
import { Wrapper } from 'components/blocks'
import { Text, H2, H4, Button, Image, Ribbon } from 'components/elements'

const CardWrapper = styled.div`
	position: relative;
	background: #ffffff;
	border: 1px solid #e4e4e4;
	font-family: Montserrat,sans-serif;
	color: #787878;
	margin: 15px 15px;
	padding: 0;
	flex-direction: column;
	&:before, &:after {
		content: ""; 
		height: 2px;
		position: absolute;
		left: 0;
		right: 0;
		-webkit-clip-path: polygon(0% 0%, 5%  100%, 10% 0%, 15%  100%, 20% 0%, 25% 100%, 30% 0%, 35%  100%, 40% 0%, 45%  100%, 50% 0%, 55%  100%, 60% 0%, 65%  100%, 70% 0%, 75%  100%, 80% 0%, 85%  100%, 90% 0%, 95%  100%, 100% 0%);		
	}
	&:before {
		background-color: #f9f9f9;
		top: 0;
	}
	&:after {
		background-color: #ffffff;
		bottom: -2px;
	}

	@media (min-width: 768px) {
		flex-direction: row;
	}

	`

const TicketCard = ({ event, ticket, showActions, showBarcode, style }) =>
  <CardWrapper borderFull boxShadow spaceBetween className='row' style={style}>
	{ticket.isForSale && <Ribbon>For Sale</Ribbon>}
	<Wrapper flexBox flexColumn flexRowLarge paddingHeight className='col-xs-12 col-md-1'>
		<Wrapper flexBox centered textCenter>
			<Text vertical>{ticket.type || ticket['Ticket Level']}</Text> <br />
		</Wrapper>
		<Wrapper flexBox centered textCenter>
			<Text vertical>{ticket.barcode || ticket['Ticket Number']}</Text>
		</Wrapper>
	</Wrapper>
      <Wrapper flexBox paddingFull centered className='col-xs-12 col-md-7'>
		<Text center>
			<H2>{ticket && ticket.eventId && ticket.eventId.name || event.name}</H2>
			{/* TODO: Update once we have a normalized VerifyTicket function on backend */}
			{ticket && ticket.eventId && <H4>{moment(ticket.eventId.startDate).format('dddd MMM Do, YYYY h:mma')}</H4>}
			{ticket && ticket.eventId && <H4>{ticket.eventId.venue.name}</H4>}
		</Text>
	</Wrapper>
	{(showActions) && (
		<Wrapper flexBox flexColumn spaceAround borderTop className='col-xs-12 col-md-4'>
		<Button primary action={() => browserHistory.push(`${ticket.eventId.urlSafe}/ticket/${ticket._id}`)}>View Barcode</Button>
        <Button subtleOutline action={() => browserHistory.push(`${ticket.eventId.urlSafe}/ticket/${ticket._id}/transfer`)}>Transfer</Button>
        <Button subtleOutline action={() => browserHistory.push(`${ticket.eventId.urlSafe}/ticket/${ticket._id}/sell`)}>Mark for Sale</Button>
      </Wrapper>
	)}
	{showBarcode && (
		<Wrapper flexBox centered borderTop className='col-xs-12 col-md-4'>
			<Image style={{ width: '50%', height: '50%' }} src={`https://terrapin.cincyregister.com/images/barcode.php?c=7829659763531204&p=520a67c3&f=0&x=2&h=60&q=3&t=qrcode`} />
		</Wrapper>
	)}
  </CardWrapper>

  TicketCard.propTypes = {
	event: PropTypes.object,
	ticket: PropTypes.object.isRequired,
	showActions: PropTypes.bool.isRequired,
	showBarcode: PropTypes.bool,
	style: PropTypes.object
  }

export default TicketCard
