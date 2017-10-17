import React, { Component } from 'react';
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
  }

  componentDidMount() {
    this.props.getEventInfo(this.props.params.id);
  }

  async buyTicket(event) {
    this.setState({isLoading: true});
    await this.props.buyTicket(event, this.state.ticketQty);
    this.props.getEventInfo(this.props.params.id);
    this.setState({ isLoading: false, buyModalOpen: false });
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
          onChange={(count) => this.setState({ ticketQty: count })}
          ticketsRemaining={this.props.event.ticketsRemaining}/></td>
      </tr>
    );
  }

  render() {
    console.log('this.props: ', this.props);
    let { name, price, date, time, venue, imageUrl } = this.props.event;
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
          <table>
            <th><td>Ticket Type</td><td>Price</td><td>Tickets Remaining</td><td>Quantity</td></th>
            <tbody>
              {this.renderTickets()}
            </tbody>
          </table>
          <button onClick={() => {
            this.setState({'buyModalOpen': true });
          }}>Buy Ticket</button>
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
            <span className='event-name'><b>Name:</b> {name}</span>
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
