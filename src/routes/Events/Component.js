/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { EventCard, Container, Wrapper } from 'components/blocks'
import { Text, Loading, Error } from 'components/elements'

const Events = ({ events, error, loading }) =>
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  // : <Container paddingTop bgOffWhite style={{margin: '0 auto'}}>
  : <Wrapper>
      <Wrapper flexBox flexColumn width100 padding3x5>
        <Wrapper padding5x4><Text fontSize7 gray600>Events Live Now</Text></Wrapper>
        <EventBlocksGrid>
          {events.map((event, index) =>
            <EventCard key={event._id} event={event} />)}
        </EventBlocksGrid>
      </Wrapper>
  </Wrapper>

  const EventBlocksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 350px);
    grid-gap: 25px;
    justify-content: center;
  `;

Events.propTypes = {
  events: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default Events
