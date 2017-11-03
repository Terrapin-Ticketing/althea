import React, { Component } from 'react';
import { Link } from 'react-router';
import Loading from '../../../components/shared/Loading.js';

import './Ticket.scss';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getTicketInfo(this.props.params.ticketId);
    this.props.updateOrder(1);
  }

  renderTicketInfo() {
    let { id, owner, eventAddress, isRedeemed, usdPrice, isForSale } = this.props.ticket;
    return (
      <div className="ticket-details">
        <span className="ticket-type">
          General Admission<br />
          <i>{id}</i>
        </span>
        <span className="price">
          ${usdPrice}
        </span>
        <span>{(isRedeemed) ? 'Redeemed' : 'Not Redeemed'}</span>
        <span>{(isForSale) ? 'For Sale' : 'Not For Sale' }</span>
      </div>
    );
  }

  render() {
    if (!this.props.ticket) {
      return (
        <Loading />
      );
    }
    return (
      <div className='ticket-container'>
        <div className="ticket-details-header">
          <span className="ticket-type">Ticket Details</span>
          <span>Price</span>
          <span>Is Redeemed</span>
          <span>Is For Sale</span>
        </div>
        {this.renderTicketInfo()}
      </div>
    );
  }
}

export default Ticket;
