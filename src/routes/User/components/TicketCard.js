import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import ReactModal from 'react-modal';
import moment from 'moment';
import classNames from 'classnames';
import './User.scss';
import Price from '../../../components/shared/Price';
import ShareModal from '../../../components/shared/ShareModal';
import TransferTicketModal from '../../../components/shared/TransferTicketModal';
import TicketSellModal from '../../../components/shared/TicketSellModal';

class TicketCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.transferTicket = this.transferTicket.bind(this);
  }

  componentDidMount() {
    this.setState({
      isForSale: this.props.ticket.isForSale,
      ticketTransfered: false,
      shareTicketModalOpen: false,
      sellTicketModalOpen: false,
      transferTicketModalOpen: false,
      initTransfer: false,
      isHover: false
    });
  }

  openTicketShareModal() {
    this.setState({ shareTicketModalOpen: true });
  }

  openTransferTicketModal() {
    this.setState({ transferTicketModalOpen: true });
  }

  openTicketSellModal() {
    this.setState({ sellTicketModalOpen: true });
    window.setTimeout(() => { Materialize.updateTextFields(); }, 500);
  }

  ticketClick(ticket) {
    browserHistory.push(`event/${ticket.eventId._id}/ticket/${ticket._id}`);
  }

  async transferTicket(ticketId, recipientEmail) {
    await this.props.transferTicket(ticketId, recipientEmail);
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
            <img src={ticket.eventId.imageUrl} />
          </div>
          <div className="card-content ticket-content flow-text" onClick={() => this.ticketClick(ticket)}>
            <a className="card-title">{ticket.eventId.name}</a>
            {/* {moment(ticket.eventId.date).format('dddd MMMM Do, YYYY')}<br /><br /> */}
            {ticket.type} <br />
            <small>Ticket Number: {ticket.barcode}</small>
            {/* <div className="venue-info">
              <small>
                {ticket.eventId.venue.name} <br />
                {ticket.eventId.venue.address} <br />
                {ticket.eventId.venue.city}, {ticket.eventId.venue.state} {ticket.eventId.venue.zip}
              </small>
            </div> */}
          </div>
          <div className="card-action valign-wrapper">
            <i onClick={() => this.openTicketShareModal()} className="material-icons share-icon">share</i>
            <div className="action-buttons">
              <Link className="action-button btn-flat waves-effect" onClick={() => this.openTicketSellModal()}>Sell</Link>
              <Link className="action-button btn-flat waves-effect" onClick={() => this.openTransferTicketModal()}>Transfer</Link>
            </div>
          </div>
        </div>
        <div className="ticket-card card horizontal sticky-action small hide-on-small-only">
          <div className="ticket-image card-image s12 m6" onClick={() => this.ticketClick(ticket)}>
            {(ticket.isForSale) ? <div className="ribbon"><span>For Sale</span></div> : null }
            <img src={ticket.eventId.imageUrl} />
          </div>
          <div className="card-stacked col s12 m6">
            <div className="card-content ticket-content" onClick={() => this.ticketClick(ticket)}>
              <a className="card-title">{ticket.eventId.name}</a>
              {/* {moment(ticket.eventId.date).format('dddd MMMM Do, YYYY')}<br /><br /> */}
              {ticket.type} <br />
              <small>Ticket Number: {ticket.barcode}</small>
              {/* <div className="venue-info">
                <small>
                  {ticket.eventId.venue.name} <br />
                  {ticket.eventId.venue.address} <br />
                  {ticket.eventId.venue.city}, {ticket.eventId.venue.state} {ticket.eventId.venue.zip}
                </small>
              </div> */}
            </div>
            <div className="card-action valign-wrapper">
              <i onClick={() => this.openTicketShareModal()} className="material-icons share-icon">share</i>
              <div className="action-buttons">
                <Link className="action-button btn-flat waves-effect" onClick={() => this.openTicketSellModal()}>Sell</Link>
                <Link className="action-button btn-flat waves-effect" onClick={() => this.openTransferTicketModal(ticket)}>Transfer</Link>
              </div>
            </div>
          </div>
        </div>
        <ShareModal
          ticket={this.props.ticket}
          closeModal={() => this.setState({shareTicketModalOpen: false})}
          isOpen={this.state.shareTicketModalOpen} />
        <TicketSellModal
          user={this.props.user}
          ticket={this.props.ticket}
          index={this.props.key}
          onAfterOpen={() => {
            window.setTimeout(() => {
              Materialize.updateTextFields();
             }, 1500);
          }}
          closeModal={() => this.setState({ sellTicketModalOpen: false })}
          isOpen={this.state.sellTicketModalOpen}
          sellTicket={this.props.sellTicket} />
        <TransferTicketModal
          ticket={this.props.ticket}
          closeModal={() => this.setState({transferTicketModalOpen: false})}
          isOpen={this.state.transferTicketModalOpen}
          transferTicket={this.transferTicket} />
      </div>
    );
  }
}

export default TicketCard;
