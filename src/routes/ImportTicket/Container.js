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
    this.props.goToStep(1)
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
      barcode={this.props.barcode}
      user={this.props.user}
      activateTicket={this.props.activateTicket}
    />
  }
}

ImportTicketContainer.propTypes = {
  event: PropTypes.object.isRequired,
  getEventInfo: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  params: PropTypes.object,
  step: PropTypes.number.isRequired,
  goToStep: PropTypes.func.isRequired,
  ticket: PropTypes.object,
  barcode: PropTypes.string,
  user: PropTypes.object,
  activateTicket: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  ...require('./modules')
}

const mapStateToProps = (state) => {
  return {
    event: state.importTicket.currentEvent,
    step: state.importTicket.step,
    ticket: state.importTicket.ticket,
    barcode: state.importTicket.barcode,
    error: state.importTicket.error,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportTicketContainer)
