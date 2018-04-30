import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

import { Wrapper, Container } from 'components/blocks'
import { H2, H4, Button, VenueInfo, Date, Loading, Error } from 'components/elements'

const Event = ({ event, error, loading }) =>
    (loading) ? <Loading />
    : (error) ? <Error error={error} />
    : <Container column marginTop marginBottom borderFull>
      <Wrapper className='row'>
        <Wrapper paddingNone className='col-md-8 col-sm-12'>
          <img className='img-fluid' src={event.imageUrl} />
        </Wrapper>
        <Wrapper paddingFull className='col-md-4 col-sm-12'>
          <H2>{event.name}</H2>
          <H4><Date date={event.date} format='dddd MMMM Do, YYYY' /></H4>
        </Wrapper>
      </Wrapper>
      <Wrapper borderFull className='row'>
        <Wrapper className='col-md-8 hidden-sm-down' />
        <Wrapper paddingFull className='col-md-4 col-sm-12'>
          <Button block primary
            action={() => browserHistory.push(`/event/${event.urlSafe}/import`)}>
              Import Ticket
          </Button>
          <Button block marginTop
            className='btn-outline-primary'
            action={() => browserHistory.push(`/event/${event.urlSafe}/availableTickets`)}>
              Available Tickets
          </Button>
        </Wrapper>
      </Wrapper>
      <Wrapper row wrap className='row'>
        <Wrapper paddingFull className='col-md-8'>
          <H2>Description</H2>
          <Wrapper dangerouslySetInnerHTML={{ __html: event.description }} />
        </Wrapper>
        <Wrapper borderLeft column paddingFull className='col-md-4'>
          <Wrapper paddingHeight>
            <H4>Date</H4>
            <Date date={event.date} format='dddd MMMM Do, YYYY' />
          </Wrapper>
          <Wrapper paddingHeight>
            <H4>Venue</H4>
            <VenueInfo venue={event.venue} />
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Container>

Event.propTypes = {
  event: PropTypes.object.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool
}

export default Event
