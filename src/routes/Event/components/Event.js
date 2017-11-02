import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import web3 from 'web3';
import QtyCounter from './QtyCounter';
import EventInfoContainer from './../../../components/shared/EventInfo';
import Price from './../../../components/shared/Price';

import './Event.scss';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyModalOpen: false,
      isLoading: false,
      ticketQty: 0
    };
    // this.buyTicket = this.buyTicket.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.renderTickets = this.renderTickets.bind(this);
    this.renderTicketTable = this.renderTicketTable.bind(this);
  }

  componentDidMount() {
    console.log('this.props.params.id: ', this.props.params.id);
    this.props.getEventInfo(this.props.params.id);
  }

  componentWillUnmount() {
  }

  // async buyTicket(event) {
  //   this.setState({isLoading: true});
  //   await this.props.buyTicket(event, this.state.ticketQty);
  //   this.props.getEventInfo(this.props.params.id);
  //   this.setState({ isLoading: false, buyModalOpen: false });
  // }

  updateOrder(ticketQty, ticketAddress) {
    this.setState({ ticketQty });
    let paymentType = 'USD';
    this.props.updateOrder({
      ticketQty,
      paymentType,
      ticketAddress,
      eventAddress: this.props.params.id
    });
  }

  renderTickets() {
    // let { tickets } = this.props.event;
    // return tickets.map((ticket, index) => {
    //   return <tr><td>{ticket.type.name}</td><td>{ticket.type.price}</td><td>Qty: Up/Down Selector</td></tr>
    // });
    return (
      <tr>
        <td>General Admission</td>
        <td><Price price={this.props.event.price}/></td>
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
    console.log('this.props: ', this.props);
    let { isLoading } = this.state;
    if (!this.props.event.name) {
      return (
        <div>nothing yet</div>
      );
    }
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       updateOrder: this.updateOrder.bind(this)
     })
    );

    return (
      <div className='event-container'>
        <EventInfoContainer event={this.props.event} />
        <div className='event-bottom-info'>
          {(this.props.params.ticketId) ? null : this.renderTicketTable()}
          {childrenWithProps}
          {this.renderBuyButton()}
        </div>

      </div>
    );
  }
}

export default Event;
