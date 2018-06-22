/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

import { Card, Container } from 'components/blocks'
import { H1, H2, Button, VenueInfo, Date, Loading, Error } from 'components/elements'

const Events = ({ events, error, loading }) =>
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  : <Container column paddingTop>
      <H1>Events Live Now</H1>
      <Container row wrap>
        {events.map((event, index) =>
        <Card key={index} onClick={() => browserHistory.push(`event/${event.urlSafe}`)} className='col-lg-4 col-md-6 col-sm-12'>
          <Card.Image src={event.imageUrl} />
          <Card.Information>
            <Card.Text>
              <H2 center>{event.name}</H2>
              <Date date={event.date} format={'dddd MMMM Do, YYYY'} />
              <VenueInfo venue={event.venue} />
            </Card.Text>
            <Card.Actions>
              <Button onClick={() => browserHistory.push(`event/${event.urlSafe}`)}>More Info</Button>
              <Button onClick={() => browserHistory.push(`event/${event.urlSafe}/import`)}>Import Ticket</Button>
            </Card.Actions>
          </Card.Information>
        </Card>)}
      </Container>
    </Container>

Events.propTypes = {
  events: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default Events
