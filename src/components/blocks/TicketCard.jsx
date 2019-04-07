import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment';

import { Wrapper } from 'components/blocks'
import { Text, Button, Image, Ribbon, Price } from 'components/elements'

import { base500 } from 'styles/colors'
import{ spacing4, spacing6, spacing16 } from 'styles/spacing'

const CardWrapper = styled(Wrapper)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: ${spacing16}
	position: relative;
	background: #ffffff;
	border: 1px solid #e4e4e4;
	font-family: Montserrat,sans-serif;
	color: #787878;
	padding: 0;
	flex-direction: column;
	padding: 16px;
  box-shadow: 0 1px 3px hsla(0,0%,0%,.2);
  border-left: 10px solid ${base500};
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

const TicketTitleWrapper = styled.div`
  width: 100%
`;

const EventInfoWrapper = styled.div`
  padding: ${spacing4} ${spacing6};
`;

const ActionButtons = styled.div`
  display: grid;
`;

const TicketTitle = styled(Text)``;
const Date = styled(Text)``;
const Type = styled(Text)``;
const Barcode = styled(Text)``;
const IsForSale = styled(Text)``;

const TicketCard = ({ event, ticket, showActions, showBarcode, style }) => {
	console.log('event, ticket, showActions, showBarcode, style : ', event, ticket, showActions, showBarcode, style );
	return (
		<CardWrapper>
      	{/* <Wrapper flexBox flexColumn flexRowLarge paddingHeight className='col-xs-12 col-md-1'>
          <Wrapper flexBox centered textCenter>
            <Text vertical >{ticket.type || ticket['Ticket Level']}</Text> <br />
          </Wrapper>
          <Wrapper flexBox centered textCenter>
            <Text vertical>{ticket.barcode || ticket['Ticket Number']}</Text>
          </Wrapper>
        </Wrapper> */}

        <Type vertical gray500 fontSize6>{ticket.type}</Type>
        <Barcode vertical gray500 fontSize2>{ticket.barcode}</Barcode>
        <EventInfoWrapper>
          <TicketTitleWrapper><TicketTitle fontSize8 gray500>{ticket.eventId.name}</TicketTitle> <br /></TicketTitleWrapper>
          <Date fontSize6 gray400>{moment(ticket.eventId.startDate).format("dddd, MMMM Do YYYY, h:mm a")}</Date>
          <IsForSale>{ticket.isForSale}</IsForSale>
        </EventInfoWrapper>
        <ActionButtons>
          <Button primaryGreen padding4x9><Text white>Action</Text></Button>
          <Button tertiaryGreen padding4x8><Text gray500>Sell Ticket</Text></Button>
        </ActionButtons>
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
