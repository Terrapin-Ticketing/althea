import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import web3 from 'web3';
import QtyCounter from './QtyCounter';
import EventInfoContainer from './../../../components/shared/EventInfo';
import Price from './../../../components/shared/Price';
import Loading from '../../../components/shared/Loading.js';

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
    let { id, ticketId } = this.props.params;
    this.props.getEventInfo(id);
    this.props.getEventAuxInfo(id);
    if (ticketId) {
      this.updateOrder(1, ticketId);
    }
  }

  async updateOrder(ticketQty, ticketAddress) {
    this.setState({ ticketQty });
    let paymentType = 'USD';
    // console.log('ORDER:', {
    //   ticketQty,
    //   paymentType,
    //   ticketAddress,
    //   eventAddress: this.props.params.id
    // });
    this.props.updateOrder({
      ticketQty,
      paymentType,
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
      <button className="buy-ticket-button" onClick={async () => {
        // if (this.props.params.ticketId) {
        //   console.log('ticket specified');
        //   await this.updateOrder(1, this.props.params.ticketId);
        // }
        browserHistory.push('/checkout');
      }}>Buy Ticket</button>
    );
  }

  render() {
    let { backgroundColor, primaryColor, imageUrl, textColor, description, website,
      venueName, venueAddress, venueState, venueCity, venueZip } = this.props.event;
    let { isLoading } = this.state;
    if (!this.props.event.name) {
      return (
        <Loading />
      );
    }
    console.log('ticket props: ', this.props);
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       updateOrder: this.updateOrder.bind(this)
     })
    );

    return (
      <div style={{backgroundColor: backgroundColor, color: textColor }} className="event-container">
            <EventInfoContainer event={this.props.event} />
            <div className='event-inner-container'>
              {(this.props.params.ticketId) ? (
                <div className='ticket-bar'>
                  { childrenWithProps }
                  <div className="">
                    make payment available on this page
                  </div>
                  {/* { this.renderBuyButton() } */}
                </div>
              ) : (
                <div className='middle-bar'>
                  <div className='spacing'></div>
                  <div className='order-container'>
                    <QtyCounter
                      count={this.state.ticketQty}
                      onChange={(count) => this.updateOrder(count) }
                      ticketsRemaining={this.props.event.ticketsRemaining} />
                      {this.renderBuyButton()}
                  </div>
                </div>
              )}
            <div className='event-bottom-info'>
              <div className="left-column">
                <h2>Description</h2>
                { /* TODO: Probably shouldn't allow this to be put in this way... */}
                <div dangerouslySetInnerHTML={{__html: description}}></div>
              </div>
              <div className="right-column">
                <h3>Date</h3>

                <h3>Location</h3>
                  {venueName} <br />
                  {venueAddress} <br />
                  {venueCity}, {venueState} {venueZip}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Event;
