import React, { Component } from 'React'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SellTicket from './Component'

class SellTicketContainer extends Component {
  async componentDidMount() {
    await this.props.getTicket(this.props.params.ticketId)
    document.title = `Sell ${this.props.ticket.eventId.name} Ticket - Terrapin Ticketing`
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    return <SellTicket
      user={this.props.user}
      ticket={this.props.ticket}
      markForSaleSuccess={this.props.markForSaleSuccess}
      loading={this.props.loading}
      error={this.props.error} />
  }
}

SellTicketContainer.propTypes = {
  ticket: PropTypes.object,
  markForSaleSuccess: PropTypes.bool.isRequired,
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
    ticket: state.sellTicket.ticket,
    user: state.auth.user,
    markForSaleSuccess: state.sellTicket.markForSaleSuccess,
    error: state.sellTicket.error,
    loading: state.sellTicket.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellTicketContainer)
