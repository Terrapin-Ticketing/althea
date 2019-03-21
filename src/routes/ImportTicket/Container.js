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
    // this.props.goToStep(1)
  }

  render() {
    return <ImportTicket
      event={this.props.event}
      loading={this.props.loading}
      activateTicketLoading={this.props.activateTicketLoading}
      error={this.props.error}
      step={this.props.step}
      afterLogin={this.afterLogin}
      goToStep={this.props.goToStep}
      ticket={this.props.ticket}
      barcode={this.props.barcode}
      user={this.props.user}
      activateTicket={this.props.activateTicket}
      logout={this.props.logout}
    />
  }
}

ImportTicketContainer.propTypes = {
  event: PropTypes.object.isRequired,
  getEventInfo: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  params: PropTypes.object,
  step: PropTypes.number.isRequired,
  goToStep: PropTypes.func.isRequired,
  ticket: PropTypes.object,
  barcode: PropTypes.string,
  user: PropTypes.object,
  activateTicket: PropTypes.func.isRequired,
  activateTicketLoading: PropTypes.bool,
  logout: PropTypes.func
}

const mapDispatchToProps = {
  ...require('./modules'),
  ...require('store/authentication')
}

const mapStateToProps = (state) => {
  return {
    event: state.importTicket.currentEvent,
    step: state.importTicket.step,
    ticket: state.importTicket.ticket,
    barcode: state.importTicket.barcode,
    error: state.importTicket.error,
    loading: state.importTicket.isLoading,
    activateTicketLoading: state.importTicket.activateTicketLoading,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportTicketContainer)
