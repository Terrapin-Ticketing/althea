import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class SuccessPage extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  viewTicket(ticket) {
    browserHistory.push(`/event/${ticket.event._id}/ticket/${ticket._id}`);
  }

  sellTicket(ticket) {
    this.props.openSellTicketModal();
    browserHistory.push(`/event/${ticket.event._id}/ticket/${ticket._id}`);
  }

  transferTicket(ticket) {
    this.props.openTransferTicketModal();
    browserHistory.push(`/event/${ticket.event._id}/ticket/${ticket._id}`);
  }

  render() {
    let { ticket, event } = this.props;
    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3" key={this.props.key}>
        <div className="card activate-card">
          <div className="card-content">
            <h1 className="activate-header">Finished!</h1>
            <div className="info-text">You just registered your {ticket.type} ticket for {event.name}.</div>
            <div className="row">
              <button className="btn-large" onClick={() => this.viewTicket(ticket)}>View Ticket</button>
            </div>
            <div className="row">
              <button className="btn-large" onClick={() => this.sellTicket(ticket)}>Sell Ticket</button>
            </div>
            <div className="row">
              <button className="btn-large" onClick={() => this.transferTicket(ticket)}>Transfer Ticket</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuccessPage;
