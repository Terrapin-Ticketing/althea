import React from 'react'
import PropTypes from 'prop-types'

import { Card } from 'components/blocks'
import { Image, VenueInfo, Date, H2, Text } from 'components/elements'

const TicketCard = ({ event, ticket }) =>
	<Card flexRow>
		<Card.Image src={event.imageUrl} />
		<Card.Information>
			<Card.Text>
				<H2 center>{event.name}</H2>
				<Date date={event.date} format={'dddd MMMM Do, YYYY'} />
				<VenueInfo venue={event.venue} />
				<Text>{ticket.type}</Text>
			</Card.Text>
			<Card.Actions>
				<Image src={'https://terrapin.cincyregister.com/images/barcode.php?c=7829659763531204&p=520a67c3&f=0&x=2&h=60&q=3&t=qrcode'} />
			</Card.Actions>
		</Card.Information>
	</Card>

TicketCard.propTypes = {
	event: PropTypes.object.isRequired,
	ticket: PropTypes.object.isRequired
}

export default TicketCard