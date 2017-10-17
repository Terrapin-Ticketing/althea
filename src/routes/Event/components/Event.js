import React, { Component } from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import web3 from 'web3';

import './Event.scss';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    console.log('this.props.params.id: ', this.props.params.id);
    this.props.getEventInfo(this.props.params.id);
  }

  renderTickets() {
    // let { tickets } = this.props.event;
    // return tickets.map((ticket, index) => {
    //   return <tr><td>{ticket.type.name}</td><td>{ticket.type.price}</td><td>Qty: Up/Down Selector</td></tr>
    // });
    return <tr><td>General Admission</td><td>**TODO: Replace</td><td>Qty: Up/Down Selector</td></tr>;
  }

  render() {
    console.log('this.props: ', this.props);
    let { name, date, time, venue, imageUrl } = this.props.event;
    if (!this.props.event.name) {
      return (
        <div>nothing yet</div>
      );
    }
    return (
      <div className='events-container'>
        <div className='event-top-info'>
          <div className='event-image-container'>
            <img src={imageUrl} className='event-image' />
          </div>
          <div className='left-column'>
            <h1>{name}</h1>
            <h4>{date}</h4>
          </div>
          <div className='right-column'>
            <div class='venue-info'>
              {venue.name} <br />
              {venue.address}
              {venue.city}, {venue.state} {venue.zip}
            </div>
            <div class='time'>
              {time}
            </div>
          </div>
        </div>
        <div className='event-bottom-info'>
          <table>
            <th><td>Ticket Type</td><td>Price</td><td>Quantity</td></th>
            <tbody>
              {this.renderTickets()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Event;
