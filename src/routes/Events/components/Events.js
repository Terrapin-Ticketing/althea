import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PageWrapper from 'components/blocks/PageWrapper'
import EventCard from 'components/blocks/EventCard'
import H1 from 'components/elements/H1'

import './Events.scss'

class Events extends Component {
  componentDidMount() {
    this.props.getEvents()
    document.title = 'Events - Terrapin Ticketing'
  }

  render() {
    return (
      <PageWrapper>
        <H1>Events Live Now</H1>
        <div className='events-list'>
          {this.props.events.map((event, index) => <EventCard event={event} key={index} />)}
        </div>
      </PageWrapper>
    )
  }
}

Events.propTypes = {
  events: PropTypes.array.isRequired,
  getEvents: PropTypes.func.isRequired
}

export default Events
