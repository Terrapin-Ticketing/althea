import React, { Component } from 'React'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ImportTicket from './Component'

class ImportTicketContainer extends Component {
  async componentDidMount() {
    await this.props.getEventInfo(this.props.params.urlSafeName)
    document.title = `Import Ticket - ${this.props.event.name} - Terrapin Ticketing`
  }

  componentWillUnmount() {
    this.props.goToStep('welcome')
  }

  render() {
    return <ImportTicket
      event={this.props.event}
      loading={this.props.loading}
      error={this.props.error}
      step={this.props.step}
      afterLogin={this.afterLogin}
      goToStep={this.props.goToStep}
      ticket={this.props.ticket}
    />
  }
}

ImportTicketContainer.propTypes = {
  event: PropTypes.object.isRequired,
  getEventInfo: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  params: PropTypes.object,
  step: PropTypes.string.isRequired,
  goToStep: PropTypes.func.isRequired,
  ticket: PropTypes.object
}

const mapDispatchToProps = {
  ...require('./modules')
}

const mapStateToProps = (state) => {
  return {
    event: state.importTicket.currentEvent,
    step: state.importTicket.step,
    ticket: state.importTicket.ticket
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportTicketContainer)
