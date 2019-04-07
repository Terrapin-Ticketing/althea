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

const TicketTitle = styled.div``;
const Date = styled.div``;
const Type = styled.div``;
const Barcode = styled.div``;
const IsForSale = styled.div``;

const TicketCard = ({ event, ticket, showActions, showBarcode, style }) => {
	console.log('event, ticket, showActions, showBarcode, style : ', event, ticket, showActions, showBarcode, style );
	return (
		<CardWrapper>
			<TicketTitle>{ticket.eventId.name}</TicketTitle>
			<Date>{ticket.eventId.startDate}</Date>
			<Type>{ticket.type}</Type>
			<Barcode>{ticket.barcode}</Barcode>
			<IsForSale>{ticket.isForSale}</IsForSale>
		</CardWrapper>
	)
}

  TicketCard.propTypes = {
	event: PropTypes.object,
	ticket: PropTypes.object.isRequired,
	showActions: PropTypes.bool.isRequired,
	showBarcode: PropTypes.bool,
	style: PropTypes.object
  }

export default TicketCard
