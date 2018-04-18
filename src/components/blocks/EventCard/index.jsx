import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import styled from 'styled-components'

import Image from 'components/elements/Image'
import Button from 'components/elements/Button'
import EventDetails from './EventDetails'
import VenueInfo from './VenueInfo'

import H2 from 'components/elements/H2'
import Date from 'components/elements/Date'

const eventClick = (event) => {
  browserHistory.push(`event/${event.urlSafe}`)
}

const goToActivate = (event) => {
  browserHistory.push(`event/${event.urlSafe}/activate`)
}

const goToTickets = (event) => {
  browserHistory.push(`event/${event.urlSafe}/tickets`)
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  flex: 1;
  border: 1px solid #e4e4e4;
  font-family: Montserrat,sans-serif;
  color: #787878;
  margin: 15px 0;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2);
`

const ImageWrapper = styled.div`
  min-width: 250px;
  flex: 1 1;
`

const EventInformationWrapper = styled.div`
  flex: 3 0;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ActionsWrapper = styled.div`
  border-top: 1px solid #e4e4e4;
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

let EventCard = ({ event }) =>
  <Wrapper>
    <ImageWrapper onClick={() => eventClick(event)}>
      <Image src={event.imageUrl} />
    </ImageWrapper>
    <EventInformationWrapper>
      <EventDetails onClick={() => eventClick(event)}>
        <H2>{event.name}</H2>
        <Date date={event.date} format='dddd MMMM Do, YYYY' />
        <VenueInfo venue={event.venue} />
      </EventDetails>
      <ActionsWrapper>
        <Button label='Available Tickets' action={() => goToTickets(event)} />
        <Button label='Activate Your Tickets' action={() => goToActivate(event)} />
      </ActionsWrapper>
    </EventInformationWrapper>
  </Wrapper>

EventCard.propTypes = {
  event: PropTypes.object.isRequired
}

export default EventCard
