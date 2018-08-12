import React, { Component } from 'React'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Event from './Component'

class EventContainer extends Component {
  async componentDidMount() {
    await this.props.getEventInfo(this.props.params.urlSafeName)
    document.title = 'Events - Terrapin Ticketing'
  }

  render() {
    return <Event
      event={this.props.event}
      loading={this.props.loading}
      error={this.props.error} />
  }
}

EventContainer.propTypes = {
  event: PropTypes.object.isRequired,
  getEventInfo: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  params: PropTypes.object
}

const mapDispatchToProps = {
  ...require('./modules')
}

const mapStateToProps = (state) => {
  return {
    event: state.event.currentEvent,
    error: state.event.error,
    loading: state.event.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer)
