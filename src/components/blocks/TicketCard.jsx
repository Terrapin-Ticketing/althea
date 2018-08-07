import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment';
import { browserHistory } from 'react-router'
import { Wrapper } from 'components/blocks'
import { Text, H2, H3, H4, Button, Image } from 'components/elements'

const CardWrapper = styled.div`
	&{
		width: 100%
		border: 1px solid #e4e4e4;
		font-family: Montserrat,sans-serif;
		color: #787878;
		margin: 15px 15px;
		padding: 0;
		box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2);
	}
	&:after {
		
	}
	`

const TicketCard = ({ event, ticket }) =>
  <CardWrapper borderFull boxShadow spaceBetween className='row'>
		{/* <Wrapper className='col-xs-12 col-md-4'>
      <Image fullWidth src={`https://terrapin.cincyregister.com/images/barcode.php?c=7829659763531204&p=520a67c3&f=0&x=2&h=60&q=3&t=qrcode`} />
		</Wrapper> */}
			<Wrapper className='col-xs-12 col-md-1'>
			<Wrapper paddingHeight>
				<Text vertical>{ticket.type || ticket['Ticket Level']}</Text>
			</Wrapper>
			</Wrapper>
      <Wrapper paddingFull className='col-xs-12 col-md-7'>
				<Text center>
          <H2>{ticket && ticket.eventId && ticket.eventId.name || event.name}</H2>
					{/* TODO: Update once we have a normalized VerifyTicket function on backend */}
					{ticket && ticket.eventId && <H3>{ticket.eventId.venue.name}</H3>}
					{ticket && ticket.eventId && <H4>{moment(ticket.eventId.startDate).format('dddd MMM Do, YYYY h:mma')}</H4>}
				</Text>
			</Wrapper>
			{(ticket.ownerId ? (
			<Wrapper flexBox flexColumn spaceAround borderTop className='col-xs-12 col-md-4'>
			<Button primary action={() => browserHistory.push(`${ticket.eventId.urlSafe}/ticket/${ticket._id}`)}>View Barcode</Button>
        <Button subtleOutline action={() => browserHistory.push(`${ticket.eventId.urlSafe}/ticket/${ticket._id}/transfer`)}>Transfer</Button>
        <Button subtleOutline action={() => browserHistory.push(`${ticket.eventId.urlSafe}/ticket/${ticket._id}/sell`)}>Mark for Sale</Button>
      </Wrapper>
			) : (
			<Wrapper flexBox flexColumn spaceAround borderTop className='col-xs-12 col-md-4'>
				<Image style={{ width: '50%', height: '50%' }} src={`https://terrapin.cincyregister.com/images/barcode.php?c=7829659763531204&p=520a67c3&f=0&x=2&h=60&q=3&t=qrcode`} />
			</Wrapper>
			))}
  </CardWrapper>

  TicketCard.propTypes = {
	event: PropTypes.object,
	ticket: PropTypes.object
  }

export default TicketCard
