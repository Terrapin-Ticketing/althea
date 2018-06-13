import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import moment from 'moment';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import QtyCounter from './QtyCounter';
import EventInfoContainer from './../../../components/shared/EventInfo/EventInfo';
import Price from './../../../components/shared/Price';
import Loading from '../../../components/shared/Loading.js';

import './Event.scss';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyModalOpen: false,
      isLoading: false,
      ticketQty: 1
    };
    // this.buyTicket = this.buyTicket.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.renderTickets = this.renderTickets.bind(this);
    this.renderTicketTable = this.renderTicketTable.bind(this);
  }

  async componentDidMount() {
    let { urlSafe } = this.props.params;
    await this.props.getEventInfo(urlSafe);
    this.props.getAvailableTickets(this.props.event);
    document.title = `${this.props.event.name} - Terrapin Ticketing`;
  }

  async updateOrder(ticketQty, ticketAddress) {
    this.setState({ ticketQty });
    let paymentType = 'USD';
    this.props.updateOrder({
      ticketQty,
      paymentType,
      eventAddress: this.props.params.id
    });
  }

  renderTickets() {
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
      <button onClick={()=> browserHistory.push('checkout')}
        className="waves-effect waves-light btn-large terrapin-green">Buy Tickets</button>
    );
  }

  renderActivateButton() {
    return (
      <button onClick={()=> browserHistory.push(`/event/${this.props.event.urlSafe}/activate`)}
        className="waves-effect waves-light btn-large terrapin-green">Import Your Ticket</button>
    );
  }

  renderViewTicketsButton() {
    return (
      <button onClick={()=> browserHistory.push(`/event/${this.props.event.urlSafe}/tickets`)}
        className="waves-effect waves-light btn-flat">View Available Tickets</button>
    );
  }

  renderAvailableTickets() {
    let { availableTickets } = this.props;
    if (availableTickets) {
      return this.props.availableTickets.map((ticket) => {
        return (
          <div key={ticket._id} className="ticket-item col s12 valign-wrapper" onClick={() => browserHistory.push(`/event/${ticket.event._id}/ticket/${ticket._id}`)}>
            <span className="ticket-type">{ticket.type}</span>
              <span className="price"><Price price={ticket.price}/></span>
            {/* <span><i className="material-icons">info</i></span> */}
          </div>
        );
      });
    }
  }

  render() {
    let { backgroundColor, textColor, description, website, venue, startDate, endDate } = this.props.event;
    let { isLoading } = this.state;
    if (!this.props.event.name) {
      return (
        <Loading />
      );
    }

    // const childrenWithProps = React.Children.map(this.props.children,
    //  (child) => React.cloneElement(child, {
    //    updateOrder: this.updateOrder.bind(this)
    //  })
    // );

    return (
      <div style={{backgroundColor: backgroundColor, color: textColor }} className="container">
        <div className="card">
            <EventInfoContainer event={this.props.event} />
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
                    {/* <QtyCounter
                      count={this.state.ticketQty}
                      onChange={(count) => this.updateOrder(count) }
                      ticketsRemaining={this.props.event.ticketsRemaining} /> */}
                      {/* {this.renderBuyButton()} */}
                      {this.renderActivateButton()}
                      {this.renderViewTicketsButton()}
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
                {`${moment(startDate).format('MMMM D')} - ${moment(endDate).format('D, YYYY')}`}

                <h3>Location</h3>
                  {venue.name} <br />
                  {venue.address} <br />
                  {venue.city}, {venue.state} {venue.zip} <br />
                <h3>{website}</h3>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h2>Available Tickets for Sale</h2>
              {this.renderAvailableTickets(this.props.availableTickets)}
            </div>
          </div>
        </div>
    );
  }
}

export default Event;
