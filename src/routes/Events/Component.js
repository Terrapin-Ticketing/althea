/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'

import { EventCard, Container } from 'components/blocks'
import { H1, H2, Button, VenueInfo, Date, Loading, Error } from 'components/elements'

const Events = ({ events, error, loading }) =>
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  : <Container column paddingTop>
      <H1>Events Live Now</H1>
      <Container row wrap>
        {events.map((event, index) =>
          <EventCard key={event._id} event={event} />)}
      </Container>
    </Container>

Events.propTypes = {
  events: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default Events
