import React, { Component } from 'react';
import { Link } from 'react-router';
import TicketRedeemModal from './TicketRedeemModal';
import EventInfoContainer from './../../../components/shared/EventInfo';
import Sidebar from '../../../layouts/Sidebar';
import QtyCounter from '../../Event/components/QtyCounter';

import './EventManager.scss';

class EventManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redeemTicketModalOpen: false,
      ticketQty: 0
    };
  }

  componentDidMount() {
    this.props.getEventInfo(this.props.params.id);
    this.props.getEventTickets(this.props.params.id);
  }

  openTicketRedeemModal() {
    this.setState({redeemTicketModalOpen: true });
  }

  updateOrder(count) {
    this.setState({ ticketQty: count });
  }

  renderTickets() {
    // let { tickets } = this.props.event;
    // return tickets.map((ticket, index) => {
    //   return <tr><td>{ticket.type.name}</td><td>{ticket.type.price}</td><td>Qty: Up/Down Selector</td></tr>
    // });
    return (
      <tr>
        <td>General Admission</td>
        <td>${this.props.event.price}</td>
        <td>{this.props.event.ticketsRemaining}</td>
        <td><QtyCounter
          count={this.state.ticketQty}
          onChange={(count) => this.updateOrder(count) }
          ticketsRemaining={this.props.event.ticketsRemaining}/></td>
      </tr>
    );
  }

  renderTicketTable() {
    return (
      <table>
        <th><td>Ticket Type</td><td>Price</td><td>Tickets Remaining</td><td>Quantity</td></th>
        <tbody>
          {this.renderTickets()}
        </tbody>
      </table>
    );
  }

  renderBuyButton() {
    return (
      <button className="buy-ticket-button"><Link to='checkout'>
        Buy Ticket
      </Link></button>
    );
  }

  render() {
    console.log('eventManager: ', this.props);
    if (!this.props.unsoldTickets) {
      return (
        <div>nothing yet</div>
      );
    }
    if (!this.props.event.name) {
      return (
        <div>nothing yet</div>
      );
    }
    return (
      <div className='sidebar-page-container'>
        <Sidebar openTicketRedeemModal={() => this.openTicketRedeemModal()} event={this.props.event} />
        <div className='event-manager-container'>
          <EventInfoContainer event={this.props.event} />
          {(!this.props.children) ? this.renderTicketTable() : null}
          <div className='event-bottom-info'>
            {this.props.children}
          </div>
          <TicketRedeemModal
            event={this.props.event}
            closeModal={() => this.setState({ redeemTicketModalOpen: false })}
            isOpen={this.state.redeemTicketModalOpen}
            redeemTicket={this.props.redeemTicket} />
        </div>
      </div>
    );
  }
}

export default EventManager;
