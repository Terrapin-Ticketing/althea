import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import ShareModal from '../ShareModal';
import TransferTicketModal from '../TransferTicketModal';
import SellTicketModal from '../SellTicketModal';

class TicketCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      ticketTransfered: false,
      initTransfer: false,
      isHover: false
    });
  }

  openShareTicketModal(ticket) {
    this.props.openShareTicketModal(ticket);
  }

  openTransferTicketModal(ticket) {
    this.props.openTransferTicketModal(ticket);
  }

  openSellTicketModal(ticket) {
    this.props.openSellTicketModal(ticket);
  }

  ticketClick(ticket) {
    browserHistory.push(`event/${ticket.event._id}/ticket/${ticket._id}`);
  }

  render() {
    const { ticket } = this.props;
    return (
      <div key={this.props.index}
        // className={classNames('scale-transition', { 'scale-out': this.state.ticketTransfered, hide: this.state.hidden, 'z-depth-2': this.state.isHover })}
        onMouseEnter={() => this.setState({isHover: true})}
        onMouseLeave={() => this.setState({isHover: false})}>
        <div className="ticket-card card show-on-small hide-on-med-and-up">
          <div className="card-image ticket-image s12 m6" onClick={() => this.ticketClick(ticket)}>
            {(ticket.isForSale) ? <div className="ribbon"><span>For Sale</span></div> : null }
            <img src={ticket.event.imageUrl} />
          </div>
          <div className="card-content ticket-content flow-text" onClick={() => this.ticketClick(ticket)}>
            <a className="card-title">{ticket.event.name}</a>
            {ticket.type} <br />
            <small>Ticket Number: {ticket.barcode}</small>
          </div>
          <div className="card-action valign-wrapper">
            <i onClick={() => this.openShareTicketModal(ticket)} className="material-icons share-icon">share</i>
            <div className="action-buttons">
              <Link className="action-button btn-flat waves-effect" onClick={() => this.openSellTicketModal(ticket)}>Sell</Link>
              <Link className="action-button btn-flat waves-effect" onClick={() => this.openTransferTicketModal(ticket)}>Transfer</Link>
            </div>
          </div>
        </div>
        <div className="ticket-card card horizontal sticky-action small hide-on-small-only">
          <div className="ticket-image card-image s12 m6" onClick={() => this.ticketClick(ticket)}>
            {(ticket.isForSale) ? <div className="ribbon"><span>For Sale</span></div> : null }
            <img src={ticket.event.imageUrl} />
          </div>
          <div className="card-stacked col s12 m6">
            <div className="card-content ticket-content" onClick={() => this.ticketClick(ticket)}>
              <a className="card-title">{ticket.event.name}</a>
              {ticket.type} <br />
              <small>Ticket Number: {ticket.barcode}</small>
            </div>
            <div className="card-action valign-wrapper">
              <i onClick={() => this.openShareTicketModal(ticket)} className="material-icons share-icon">share</i>
              <div className="action-buttons">
                <Link className="action-button btn-flat waves-effect" onClick={() => this.openSellTicketModal(ticket)}>Sell</Link>
                <Link className="action-button btn-flat waves-effect" onClick={() => this.openTransferTicketModal(ticket)}>Transfer</Link>
              </div>
            </div>
          </div>
        </div>
        <ShareModal
          ticket={this.props.ticket}
          closeModal={() => this.setState({shareTicketModalOpen: false})}
          isOpen={this.state.shareTicketModalOpen} />
        <SellTicketModal
          ticket={this.props.ticket}
          isOpen={this.props.sellTicketModalOpen} />
        <TransferTicketModal
          ticket={this.props.ticket}
          isOpen={this.props.transferTicketModalOpen} />
      </div>
    );
  }
}

export default TicketCard;
