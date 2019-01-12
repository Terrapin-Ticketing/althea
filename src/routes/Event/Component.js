import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

import { Wrapper, Container } from 'components/blocks'
import { Text, Image, Button, Date, Loading, Error } from 'components/elements'

const Event = ({ event, error, loading }) =>
    (loading) ? <Loading />
    : (error) ? <Error error={error} />
    : <Container column center>
      <Wrapper flexBox margin7x0>
        <Wrapper width100 style={{ flex: '1 50%' }}>
          <Image fullWidth src={event.imageUrl} />
        </Wrapper>
        <Wrapper padding4x4 flexBox flexColumn style={{ flex: '1 45%' }}>
          <Text fontSize6 gray700>{event.name}</Text>
          <Text fontSize4 gray500><Date date={event.date} format='dddd MMMM Do, YYYY' /></Text>
        </Wrapper>
      </Wrapper>
      <Wrapper>
        <Wrapper width14 padding6x0 flexBox flexColumn>
          <Button primaryGreen padding3x5
            action={() => browserHistory.push(`/event/${event.urlSafe}/import`)}>
              Import Ticket
          </Button>
          <Button tertiaryGray padding3x5
            action={() => browserHistory.push(`/event/${event.urlSafe}/availableTickets`)}>
              Available Tickets
          </Button>
        </Wrapper>
      </Wrapper>
      <Wrapper>
        <Wrapper>
          <Text>Description</Text>
          <Wrapper dangerouslySetInnerHTML={{ __html: event.description }} />
        </Wrapper>
        <Wrapper>
          <Wrapper>
            <Text>Date</Text>
            <Date date={event.date} format='dddd MMMM Do, YYYY' />
          </Wrapper>
          <Wrapper>
            <Text>Venue</Text>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Container>

Event.propTypes = {
  event: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default Event
