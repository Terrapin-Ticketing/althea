import React, { Component } from 'react';
import { Link } from 'react-router';

import './Ticket.scss';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getTicketInfo(this.props.params.ticketId);
  }

  renderTicketInfo() {
    let { id, owner, eventAddress, isRedeemed, usdPrice } = this.props.ticket;
    return (
      <div className="ticket-details">
        <span className="ticket-type">
          General Admission<br />
          <i>{id}</i>
        </span>
        <span className="price">
          ${usdPrice}
        </span>
        <span>{(isRedeemed) ? 'Not Redeemed' : 'Redeemed'}</span>
      </div>
    );
  }

  render() {
    if (!this.props.ticket) {
      return (
        <div>nothing yet</div>
      );
    }
    return (
      <div className='ticket-container'>
        <div className="ticket-details-header">
          <span className="ticket-type">Ticket Details</span>
          <span>Price</span>
          <span>Is Redeemed</span>
        </div>
        {this.renderTicketInfo()}
      </div>
    );
  }
}

export default Ticket;
