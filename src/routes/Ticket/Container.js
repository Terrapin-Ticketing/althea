import React, { Component } from 'React'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Ticket from './Component'

class TicketContainer extends Component {
  async componentDidMount() {
    console.log('this.props: ', this.props)
    await this.props.getTicket(this.props.params.ticketId)
    document.title = 'Ticket - Terrapin Ticketing'
  }

  render() {
    return <Ticket
      user={this.props.user}
      ticket={this.props.ticket}
      loading={this.props.loading}
      error={this.props.error} />
  }
}

TicketContainer.propTypes = {
  ticket: PropTypes.object,
  user: PropTypes.object,
  params: PropTypes.object,
  getTicket: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
}

const mapDispatchToProps = {
  ...require('./modules')
}

const mapStateToProps = (state) => {
  return {
    ticket: state.ticket.ticket,
    user: state.auth.user,
    error: state.ticket.error,
    loading: state.ticket.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketContainer)
