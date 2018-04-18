import styled from 'styled-components'

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  align-items: center;
  height: 100%;
  justify-content: center;
  @media (min-width: 48em) {
    align-items: flex-start;
  }
`

export default EventDetails
