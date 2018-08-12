import React, { Component } from 'React'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TransferTicket from './Component'

class TransferTicketContainer extends Component {
  async componentDidMount() {
    await this.props.getTicket(this.props.params.ticketId)
    document.title = `Transfer ${this.props.ticket.eventId.name} Ticket - Terrapin Ticketing`
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    return <TransferTicket
      user={this.props.user}
      ticket={this.props.ticket}
      transferSuccess={this.props.transferSuccess}
      loading={this.props.loading}
      error={this.props.error} />
  }
}

TransferTicketContainer.propTypes = {
  ticket: PropTypes.object,
  transferSuccess: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  params: PropTypes.object,
  getTicket: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
}

const mapDispatchToProps = {
  ...require('./modules')
}

const mapStateToProps = (state) => {
  return {
    ticket: state.transferTicket.ticket,
    user: state.auth.user,
    transferSuccess: state.transferTicket.transferSuccess,
    error: state.transferTicket.error,
    loading: state.transferTicket.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferTicketContainer)
