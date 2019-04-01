import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { browserHistory } from 'react-router'
import moment from 'moment';

import { Wrapper } from 'components/blocks'
import { Text, Image, Button } from 'components/elements'

import { white } from 'styles/colors';

const EventCard = ({ event }) =>
    <EventCardWrapper>
      <Wrapper flexBox style={{ height: 256 }}>
        <Image fullWidth src={event.imageUrl} />
      </Wrapper>
      <div>
        <Wrapper padding6x2 flexBox flexRow>
          <Wrapper textCenter padding0x5> 
            <Text red400 fontWeight700 fontSize5>{moment(event.startDate).format('MMM')}</Text><br />
            <Text gray700 fontWeight700 fontSize5 style={{ lineHeight: 0.5 }}>{moment(event.startDate).format('D')}</Text>
          </Wrapper>
          <Wrapper>
          <Text gray700 fontWeight700 fontSize5>{event.name}</Text><br />
          <Wrapper style={{ lineHeight: '20px' }}>
            <Text gray400 fontSize3 fontWeight500 fontSize5>{moment(event.startDate).format('dddd, MMMM Do, h:mm A')} {event.timezone}</Text><br />
            <Text gray400 fontSize1 fontWeight500 fontSize>{event.venue.name}</Text><br />
            <Text gray400 fontSize1 fontWeight500 fontSize>{event.venue.address} {event.venue.city} {event.venue.state} {event.venue.zip}</Text><br />
          </Wrapper>
          </Wrapper>
        </Wrapper>
        </div>
        <Wrapper flexBox padding4x2 spaceAround style={{ alignItems: 'baseline', paddingTop: 0 }}>
          <Button tertiaryGreen padding2x2 action={() => browserHistory.push(`event/${event.urlSafe}`)}>More Info</Button>
          <Button primaryGreen padding3x4 action={() => browserHistory.push(`event/${event.urlSafe}/import`)}>Activate Ticket</Button>
        </Wrapper>
    </EventCardWrapper>

const EventCardWrapper = styled.div`
  display: grid;
  grid-template-rows: 256px auto 64px;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, .2);
  background: ${white};
`;


  EventCard.propTypes = {
    event: PropTypes.object
  }

export default EventCard
