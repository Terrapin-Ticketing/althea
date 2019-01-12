import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { browserHistory } from 'react-router'
import moment from 'moment';

import { Wrapper } from 'components/blocks'
import { Text, Image, Button } from 'components/elements'

const CardWrapper = styled.div`
  display: flex;
  background: #ffffff;
  flex-wrap: wrap;
  border: 1px solid #e4e4e4;
  font-family: Montserrat,sans-serif;
  color: #787878;
  margin: 15px 15px;
  padding: 0;
  max-height: 60vh;
  flex-direction: ${p => p.flexRow ? 'row' : 'column'};
  @media screen and (min-width: 40em) {
    flex-direction: column;
    }
    @media screen and (min-width: 60em) {
        flex-direction: column;
    }`

const EventCard = ({ event }) =>
  <Wrapper padding0x3 flexBox flexColumn className='grid-item'>
    <Wrapper flexBox style={{ height: 256 }}>
      <Image fullWidth src={event.imageUrl} />
    </Wrapper>
    <Wrapper flexBox flexColumn boxShadow>
      <Wrapper padding6x2 flexBox flexRow>
        <Wrapper width8 textCenter>
          <Text red400 fontWeight700 fontSize5>{moment(event.startDate).format('MMM')}</Text><br />
          <Text gray700 fontWeight700 fontSize5 style={{ lineHeight: 0.5 }}>{moment(event.startDate).format('D')}</Text>
        </Wrapper>
        <Wrapper flexBox flexColumn>
        <Text gray700 fontWeight700 fontSize5>{event.name}</Text><br />
        <Wrapper style={{ lineHeight: '20px' }}>
          <Text gray400 fontSize3 fontWeight500 fontSize5>{moment(event.startDate).format('dddd, MMMM Do, h:mm A')} {event.timezone}</Text><br />
          <Text gray400 fontSize1 fontWeight500 fontSize>{event.venue.name}</Text><br />
          <Text gray400 fontSize1 fontWeight500 fontSize>{event.venue.address} {event.venue.city} {event.venue.state} {event.venue.zip}</Text><br />
        </Wrapper>
        </Wrapper>
      </Wrapper>
      <Wrapper flexBox padding4x2 spaceAround style={{ alignItems: 'baseline', paddingTop: 0 }}>
        <Button tertiaryGreen padding2x2 action={() => browserHistory.push(`event/${event.urlSafe}`)}>More Info</Button>
        <Button primaryGreen padding3x4 action={() => browserHistory.push(`event/${event.urlSafe}/import`)}>Activate Ticket</Button>
      </Wrapper>
    </Wrapper>
  </Wrapper>

  EventCard.propTypes = {
    event: PropTypes.object
  }

export default EventCard
