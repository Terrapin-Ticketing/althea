/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'

import { EventCard, Container, Wrapper } from 'components/blocks'
import { Text, Loading, Error } from 'components/elements'

const Events = ({ events, error, loading }) =>
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  // : <Container paddingTop bgOffWhite style={{margin: '0 auto'}}>
  : <Wrapper>
      <Wrapper flexBox flexColumn width100>
        <Wrapper padding5x4><Text fontSize7 gray600>Events Live Now</Text></Wrapper>
        <Wrapper flexBox flexRow padding0x3 row wrap bgOffWhite marginAuto className="grid-row">
          {events.map((event, index) =>
            <EventCard key={event._id} event={event} />)}
        </Wrapper>
      </Wrapper>
  </Wrapper>

Events.propTypes = {
  events: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default Events
