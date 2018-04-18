import React from 'React'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-size: 80%;
`

const Line = styled.div`
  width: 100%;
`

const VenueInformation = ({ venue }) =>
  <Wrapper>
    <Line>{venue.name}</Line>
    <Line>{venue.address}</Line>
    <Line>{venue.city}, {venue.state} {venue.zipcode}</Line>
  </Wrapper>

VenueInformation.propTypes = {
  venue: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.number,
  })
}

export default VenueInformation
