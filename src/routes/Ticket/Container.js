import React, { Component } from 'React'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Ticket from './Component'

class TicketContainer extends Component {
  async componentDidMount() {
    const { getTicket, ticket, user, params, reserveTicket } = this.props
    await getTicket(params.ticketId)
    if (!user || ticket.ownerId._id !== user._id) {
      await reserveTicket(params.ticketId)
    }
    document.title = 'Ticket - Terrapin Ticketing'

    if (this.props.reserveToken) {
      let remove = this.props.router.setRouteLeaveHook(this.props.route, () => {
        remove();
        // if (this.state.isBuying) return;
        return 'If you leave you will lose your claim to this ticket';
      });
    }

    window.addEventListener('beforeunload', this._beforeUnload);
  }

  componentWillUnmount() {
    const { deleteReserveToken, params, reserveToken } = this.props;
    deleteReserveToken(params.ticketId, reserveToken);
    window.removeEventListener('beforeunload', this._beforeUnload);
  }

  _beforeUnload(ev) {
    ev.preventDefault();
    const { deleteReserveToken, params, reserveToken } = this.props;
    deleteReserveToken(params.ticketId, reserveToken);
    return null;
  }

  render() {
    return <Ticket
      user={this.props.user}
      reserveToken={this.props.reserveToken}
      ticket={this.props.ticket}
      loading={this.props.loading}
      error={this.props.error} />
  }
}

TicketContainer.propTypes = {
  ticket: PropTypes.object,
  reserveToken: PropTypes.string,
  deleteReserveToken: PropTypes.func,
  user: PropTypes.object,
  params: PropTypes.object,
  getTicket: PropTypes.func.isRequired,
  reserveTicket: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
  router: PropTypes.object,
  route: PropTypes.object
}

const mapDispatchToProps = {
  ...require('./modules')
}

const mapStateToProps = (state) => {
  return {
    ticket: state.ticket.ticket,
    reserveToken: state.ticket.reserveToken,
    user: state.auth.user,
    error: state.ticket.error,
    loading: state.ticket.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketContainer)
