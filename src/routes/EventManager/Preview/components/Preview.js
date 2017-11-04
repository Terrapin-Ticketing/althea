import React, { Component } from 'react';
import { Link } from 'react-router';
import Price from '../../../../components/shared/Price';
import QtyCounter from '../../../Event/components/QtyCounter';

import './Preview.scss';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketQty: 0
    };
    this.renderTickets = this.renderTickets.bind(this);
    this.renderTicketTable = this.renderTicketTable.bind(this);
  }

  componentDidMount() {
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
        <td><Price price={this.props.event.price} /></td>
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
    return (
      <div className='event-container'>
        {this.renderTicketTable()}
        {this.renderBuyButton()}
      </div>
    );
  }
}

export default Preview;
