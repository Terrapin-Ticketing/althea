import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

import { Card, Container } from 'components/blocks'
import { H1, H2, H4, Button, VenueInfo, Date, Loading, Error } from 'components/elements'

const Wallet = ({ tickets, error, loading }) =>
  (loading) ? <Loading />
  : (error) ? <Error error={error} />
  : <Container column paddingTop>
      <H1>My Wallet</H1>
      <H4>View and manage your concert tickets</H4>
      <Container row wrap>
        {tickets.map((ticket, index) =>
        <Card key={index} onClick={() => browserHistory.push(`ticket/${ticket._id}`)} className='col-lg-12 col-md-12 col-sm-12'>
          <Card.Image src={ticket.imageUrl} />
          <Card.Information>
            <Card.Text>
              <H2 center>{ticket.name}</H2>
              <Date date={ticket.date} format={'dddd MMMM Do, YYYY'} />
              <VenueInfo venue={ticket.venue} />
            </Card.Text>
            <Card.Actions>
              <Button onClick={() => browserHistory.push(`ticket/${ticket.urlSafe}`)}>More Info</Button>
              <Button onClick={() => browserHistory.push(`ticket/${ticket.urlSafe}/import`)}>Import Ticket</Button>
            </Card.Actions>
          </Card.Information>
        </Card>)}
      </Container>
    </Container>

Wallet.propTypes = {
  tickets: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default Wallet
