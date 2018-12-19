import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { browserHistory } from 'react-router'
import { Wrapper } from 'components/blocks'
import { Text, Image, Button } from 'components/elements'

const CardWrapper = styled.div.attrs({
  className: 'col-lg-4 col-md-4 col-xs-12'
  })`
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

const Actions = styled.div`
  display: flex;
  justify-content: space-around;
	border-top: 1px solid #ced4da;
	padding: 1rem;
`

const EventCard = ({ event }) =>
  <CardWrapper>
    <Wrapper flexBox>
      <Image src={event.imageUrl} />
    </Wrapper>
    <Wrapper flexBox flexColumn spaceBetween>
      <Wrapper paddingFull>
				<Text center>
            <Text>{event.name}</Text>
        </Text>
      </Wrapper>
      <Actions>
        <Button action={() => browserHistory.push(`event/${event.urlSafe}`)}>More Info</Button>
        <Button action={() => browserHistory.push(`event/${event.urlSafe}/import`)}>Activate Ticket</Button>
      </Actions>
    </Wrapper>
  </CardWrapper>

  EventCard.propTypes = {
    event: PropTypes.object
  }

export default EventCard
