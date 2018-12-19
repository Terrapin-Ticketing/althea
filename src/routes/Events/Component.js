/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'

import { EventCard, Container } from 'components/blocks'
import { Text, Loading, Error } from 'components/elements'

const Events = ({ events, error, loading }) =>
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  : <Container column paddingTop bgOffWhite>
      <Text>Events Live Now</Text>
      <Container row wrap bgOffWhite>
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
