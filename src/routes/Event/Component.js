// eslint-disable
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

import { Wrapper } from 'components/blocks'
// import { Text, Image, Button, Date, Loading, Error } from 'components/elements'
import { Text, Loading, Error } from 'components/elements'

import { spacing5 } from 'styles/spacing';
import { white, base100, base200, base500, gray100 } from 'styles/colors';

const Event = ({ event, error, loading }) =>
    (loading) ? <Loading />
    : (error) ? <Error error={error} />
    : <PageContainer>
        <EventWrapper>
        <Wrapper padding2x4><Text fontSize7 gray600>{event.name}</Text></Wrapper>
        <EventInfoContainer>
          <FullWidthImage src={event.imageUrl} />
          <ButtonContainer>
            <ImportTicketButton
              onClick={() => browserHistory.push(`/event/${event.urlSafe}/import`)}>
                <Text gray600 fontSize3 fontWeight800>Upload Ticket</Text> <br />
                <Text gray500 fontSize2 fontWeight400>blah blah blah</Text>
            </ImportTicketButton>
            <AvailableTicketsButton
              onClick={() => browserHistory.push(`/event/${event.urlSafe}/availableTickets`)}>
                <Text gray600 fontSize3 fontWeight800>Available Tickets</Text> <br />
                <Text gray500 fontSize2 fontWeight400>blah blah blah</Text>
            </AvailableTicketsButton>
          </ButtonContainer>
        </EventInfoContainer>

        <Wrapper padding2x4><Text fontSize6 gray600>Available Tickets</Text></Wrapper>
        <TicketsContainer>
          <TicketItem>
            <Image src={require('assets/tickets.svg')} />
            <Text fontSize6 fontWeight800 gray400>There are no tickets currently available.</Text>
          </TicketItem>
        </TicketsContainer>

        <Wrapper padding2x4><Text fontSize6 gray600>Details</Text></Wrapper>
        <EventDescription>
          {/* eslint-disable react/no-unescaped-entities */}
        The 10th annual Domefest returns for another three-day celebration of music, friendship and life on May 16-18, 2019 at Marvin’s Mountaintop in Masontown, WV!! Hope you’re ready for a wild and wonderful weekend in the woods!!
        Domefest 2019 Lineup:
        Pigeons Playing Ping Pong (x5)Aqueous (x2)LITZMungion (x2)Joe Hertler & The Rainbow SeekersThe FritzThe Domefest All-StarsFunk You ft. The BrotherhornsCyclesFletcher's GroveGooseWest End BlendSwimmerKendall Street CompanyDeaf SceneThe Dirty Grass PlayersScrambled Greg (ft. Greg Ormont from Pigeons)Chalk DinosaurSchwa (ft. Ben Carrey from Pigeons)Mateo MonkPuremotion (ft. Alex Petropulos from Pigeons)
Nestled in the rolling hills and lush trees of West Virginia, Marvin's Mountaintop is truly a magical place. We've carved out a unique layout that features an intimate tree-lined natural amphitheater with plenty of comfortable camping and parking space nearby. Its serene and secluded setting is ideal for Domefest’s signature music schedule of no overlapping sets and nonstop music. 
Enjoy a selection of tasty food vendors (including vegetarian/vegan options) and unique craft vendors on site, plus, all ticket holders are welcome to attend our complimentary workshops at the festival. Past workshops have included acroyoga, aerial silks, hooping, improv games, juggling, poi and more.
General Admission Festival Pass includes: Festival pass for the weekend, plus camping and free parking for any vehicle under 20'6". Limited oversized parking spaces including RVs can be purchased separately.
High Flyer Festival Pass (**SOLD OUT**) includes: Festival pass for the weekend plus camping and free parking for any vehicle under 20'6", private entrance to festival grounds, premium High Flyer wooded camping perched atop the concert bowl, festival merch package including exclusive limited edition pin, koozie and more, Domefest water bottle and water refill station, commemorative High Flyer laminate pass, Access to "High Flyer Lounge" with morning coffee and late night snacks, artist meet and greet with headliner, select Domefest 2019 soundboards emailed post-festival.
Primitive RV parking passes are available in GA and High Flyer camping areas, plus limited spaces with power hookups while supplies last. Any vehicle more than 20'6" in length must purchase an RV pass and park in a designated RV parking area on site.
Domefest is 18+ unless accompanied by a parent or legal guardian. Kids ages 4-12 will be $20 at the gate, cash only. Children under 4 years old will be free of charge.
Stay tuned to our Facebook, Instagram and website for more updates. We can’t wait to see all of your smiling faces at the TENTH ANNUAL DOMEFEST!!
Craft Vending Application: bit.ly/DomefestCraftVendingFood 
        </EventDescription>
      </EventWrapper>
    </PageContainer>


const PageContainer = styled.div`
  margin: 0 auto;
`;

const EventWrapper = styled.div`
  display: grid;
  max-width: 1280px;
  margin-top: ${spacing5};
  grid-gap: 25px;
  padding: 0 ${spacing5};
`;

const Section = styled.div`
  background: ${white};
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, .2);
  border-top: 5px solid ${base500};
  padding: ${spacing5};
`;

const EventInfoContainer = styled(Section)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-gap: 12px;
`;

const ImportTicketButton = styled.button`
  border: 1px solid ${base500};
  border-radius: 4px;
  padding: ${spacing5};
  box-shadow: 0 -2px 0 hsla(0 0% 100% 0.15);
  box-shadow:  inset 0 2px 2px hsla(0 0% 0% 0.1);
  background: ${base100};
  text-align: left;

  &:active, &:focus {
    background: ${base200};
    outline: 0;
  }
`;

const AvailableTicketsButton = styled.button`
  border: 1px solid ${base500};
  border-radius: 4px;
  padding: ${spacing5};
  text-align: left;

  &:active, &:focus {
    outline: 0;
    background: ${gray100};
  }
`;

const EventDescription = styled(Section)``;

const TicketsContainer = styled(Section)``;

const TicketItem = styled.div`
  display: grid;
  grid-auto-columns: 50% 50%;
  grid-auto-flow: column;
  grid-auto-rows: 140px;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const FullWidthImage = styled.img`
  width: 100%;
`;

    
    // <Container column center>
    //   <Wrapper flexBox margin7x0>
    //     <Wrapper width100 style={{ flex: '1 50%' }}>
    //       <Image fullWidth src={event.imageUrl} />
    //     </Wrapper>
    //     <Wrapper padding4x4 flexBox flexColumn style={{ flex: '1 45%' }}>
    //       <Text fontSize6 gray700>{event.name}</Text>
    //       <Text fontSize4 gray500><Date date={event.date} format='dddd MMMM Do, YYYY' /></Text>
    //     </Wrapper>
    //   </Wrapper>
    //   <Wrapper>
    //     <Wrapper width14 padding6x0 flexBox flexColumn>
          // <Button primaryGreen padding3x5
          //   action={() => browserHistory.push(`/event/${event.urlSafe}/import`)}>
          //     Import Ticket
          // </Button>
          // <Button tertiaryGray padding3x5
          //   action={() => browserHistory.push(`/event/${event.urlSafe}/availableTickets`)}>
          //     Available Tickets
          // </Button>
    //     </Wrapper>
    //   </Wrapper>
    //   <Wrapper>
    //     <Wrapper>
    //       <Text>Description</Text>
    //       <Wrapper dangerouslySetInnerHTML={{ __html: event.description }} />
    //     </Wrapper>
    //     <Wrapper>
    //       <Wrapper>
    //         <Text>Date</Text>
    //         <Date date={event.date} format='dddd MMMM Do, YYYY' />
    //       </Wrapper>
    //       <Wrapper>
    //         <Text>Venue</Text>
    //       </Wrapper>
    //     </Wrapper>
    //   </Wrapper>
    // </Container>

Event.propTypes = {
  event: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default Event
