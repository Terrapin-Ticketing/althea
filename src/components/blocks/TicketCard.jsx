import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment';
import { browserHistory } from 'react-router'
import { Wrapper } from 'components/blocks'
import { Text, Button, Image, Ribbon, Price } from 'components/elements'

const CardWrapper = styled(Wrapper)`
	display: flex;
	width: 100%;
	position: relative;
	background: #ffffff;
	border: 1px solid #e4e4e4;
	font-family: Montserrat,sans-serif;
	color: #787878;
	margin: 15px 15px;
	padding: 0;
	flex-direction: column;
	padding: 16px;
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

const ActionButtons = styled(Wrapper)`
border-top: 1px solid #f0f1f2;

@media (min-width: 768px) {
	border-top: none;
}
`;

const TicketCard = ({ event, ticket, showActions, showBarcode, style }) =>
  <CardWrapper borderFull boxShadow spaceBetween style={style} width16>
	{ticket.isForSale && <Ribbon>For Sale</Ribbon>}
	<Wrapper flexBox flexColumn flexRowLarge padding6x1 width15 style={{ fontSize: 10 }}>
		<Wrapper flexBox centered textCenter>
			<Text fontSize3 gray600 vertical>{ticket.ticket_class_name || ticket.type || ticket['Ticket Level']}</Text> <br />
		</Wrapper>
		<Wrapper flexBox centered textCenter>
			<Text fontSize3 gray600 vertical>{ticket.barcodes[0].barcode || ticket['Ticket Number']}</Text>
		</Wrapper>
	</Wrapper>
  <Wrapper flexBox flexColumn padding6x6 centered>
			<Text fontSize6 gray700>{event.name}</Text>
			{/* TODO: Update once we have a normalized VerifyTicket function on backend */}
			<Text fontSize2 gray600>{moment(event.startDate).format('dddd MMM Do, YYYY')}</Text>
			<Text fontSize2 gray600>{event.venue.name}</Text>
	</Wrapper>
	{(showActions && !ticket.isForSale) && (
		<Wrapper flexBox flexColumn spaceAround borderTop>
		<Button primary action={() => browserHistory.push(`${ticket.eventId.urlSafe}/ticket/${ticket._id}`)}>View Barcode</Button>
        <Button subtleOutline action={() => browserHistory.push(`${event.urlSafe}/ticket/${ticket._id}/transfer`)}>Transfer</Button>
        <Button subtleOutline action={() => browserHistory.push(`${event.urlSafe}/ticket/${ticket._id}/sell`)}>Mark for Sale</Button>
      </Wrapper>
	)}
	{(ticket.isForSale && showActions) && (
		<ActionButtons flexBox flexColumn spaceAround textCenter>
			<Text fontSize1 gray600 center>Price: <Price price={ticket.price} /></Text>
			<Button tertiaryGray action={() => browserHistory.push(`${event.urlSafe}/ticket/${ticket._id}`)}>
				<Text fontSize1 gray600>Share Listing</Text>
			</Button>
			<Button tertiaryGray action={() => browserHistory.push(`${event.urlSafe}/ticket/${ticket._id}/sell`)}>
				<Text fontSize1 gray600>Edit Listing</Text>
			</Button>
			{/* <Button subtleOutline action={() => null}>Remove Ticket as For Sale</Button> */}
		</ActionButtons>
	)}
	{showBarcode && (
		<Wrapper flexBox centered borderTop>
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
