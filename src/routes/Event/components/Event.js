import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import web3 from 'web3';
import QtyCounter from './QtyCounter';

import './Event.scss';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyModalOpen: false,
      isLoading: false,
      ticketQty: 0
    };
    this.buyTicket = this.buyTicket.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.renderTickets = this.renderTickets.bind(this);
    this.renderTicketTable = this.renderTicketTable.bind(this);
  }

  componentDidMount() {
    console.log('this.props.params.id: ', this.props.params.id);
    this.props.getEventInfo(this.props.params.id);
  }

  async buyTicket(event) {
    this.setState({isLoading: true});
    await this.props.buyTicket(event, this.state.ticketQty);
    this.props.getEventInfo(this.props.params.id);
    this.setState({ isLoading: false, buyModalOpen: false });
  }

  updateOrder(count) {
    this.setState({ ticketQty: count });
    this.props.updateOrder(count);
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

  render() {
    let { name, price, owner, date, time, venue, imageUrl } = this.props.event;
    console.log('event.props: ', this.props);
    let { isLoading } = this.state;
    if (!this.props.event.name) {
      return (
        <div>nothing yet</div>
      );
    }
    return (
      <div className='event-container'>
        <div className='event-top-info'>
          <div className='event-image-container'>
            <img src={imageUrl} className='event-image' />
          </div>
          <div className='left-column'>
            <h1>{name}</h1>
            <h4>Owner: {owner}</h4>
            <h4>{date}</h4>
            <h4>${price}</h4>
          </div>
          <div className='right-column'>
            <div className='venue-info'>
              {venue.name} <br />
              {venue.address} <br />
              {venue.city}, {venue.state} {venue.zip}
            </div>
            <div className='time'>
              {time}
            </div>
          </div>
        </div>
        <div className='event-bottom-info'>
          {(this.props.params.ticketId) ? (this.props.children) : (this.renderTicketTable())}
          <button className="buy-ticket-button"><Link to='checkout'>
            Buy Ticket
          </Link></button>
        </div>

        <ReactModal
          isOpen={this.state.buyModalOpen}
          contentLabel="Payment Modal"
          onRequestClose={() => {
            if (!this.state.isLoading) {
              this.setState({buyModalOpen: false});
            }
          }}
          style={require('./../../../layouts/modal-styles').default}
        >
          <h2 className="checkout-header">Buy a Ticket</h2>
          <div className="event-details">
            <span className="event-header">Event Details</span>
            <span className='event-name'><b>Name:</b>{name}</span>
            <span className='event-price'><b>Price:</b>${price}</span>

            <button
              className={classNames('purchase-ticket', {isLoading: isLoading, notLoading: !isLoading })}
              onClick={() => {
                this.buyTicket(this.props.event);
              }}>
              { (isLoading) ? <img src={require('../../../layouts/assets/img/spinner.svg')} /> : 'Confirm Purchase'}
            </button>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default Event;
