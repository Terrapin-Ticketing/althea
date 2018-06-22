import React, { Component } from 'React'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Events from './Component'

class EventsContainer extends Component {
  componentDidMount() {
    this.props.getEvents()
    document.title = 'Events - Terrapin Ticketing'
  }

  render() {
    return <Events events={this.props.events} loading={this.props.loading} error={this.props.error} />
  }
}

EventsContainer.propTypes = {
  events: PropTypes.array.isRequired,
  getEvents: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
}

const mapDispatchToProps = {
  ...require('./modules')
}

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
    error: state.events.error,
    loading: state.events.loading,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer)
