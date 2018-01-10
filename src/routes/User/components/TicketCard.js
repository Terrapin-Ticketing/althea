import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import ReactModal from 'react-modal';
import moment from 'moment';
import classNames from 'classnames';
import './User.scss';
import Price from '../../../components/shared/Price';
import TicketTransferModal from '../../../components/shared/TicketTransferModal';
import TicketSellModal from '../../../components/shared/TicketSellModal';

class TicketRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isForSale: props.ticket.isForSale,
      ticketTransfered: false,
      sellTicketModalOpen: false,
      transferTicketModalOpen: false,
      initTransfer: false
    };
    this.transferTicket = this.transferTicket.bind(this);
  }

  componentDidMount() {
  }

  openTicketTransferModal() {
    this.setState({ transferTicketModalOpen: true });
  }

  openTicketSellModal() {
    this.setState({ sellTicketModalOpen: true });
    window.setTimeout(() => { Materialize.updateTextFields(); }, 500);
  }

  ticketClick(ticket) {
    return (e) => {
      browserHistory.push(`event/${ticket.eventId._id}/ticket/${ticket._id}`);
    };
  }

  async transferTicket(ticketId, recipientEmail) {
    let res = await this.props.transferTicket(ticketId, recipientEmail);
    this.setState({ ticketTransfered: true });
    setTimeout(function() { this.setState({hidden: true}); }.bind(this), 500);
  }

  render() {
    const { ticket, key } = this.props;
    return (
      <div className={classNames('scale-transition', { 'scale-out': this.state.ticketTransfered, hide: this.state.hidden })}>
        <div className="card medium show-on-small hide-on-med-and-up" style={{height: 450}}>
          <div className="card-image col s12 m6">
            {(ticket.isForSale) ? <div className="ribbon"><span>For Sale</span></div> : null }
            <img src={ticket.eventId.imageUrl} />
            <span className="card-title">{ticket.eventId.name}</span>
            {/* <a className="btn-floating halfway-fab waves-effect waves-light terrapin-green"><i className="material-icons">share</i></a> */}
          </div>
          <div className="col s12 m6">
            <div className="card-content flow-text">
              <a className="card-title">{ticket.eventId.name}</a>
              <small>{moment(ticket.eventId.date).format('dddd MMMM Do, YYYY')}</small>
              <div className="venue-info">
                {ticket.eventId.venue.name} <br />
                {ticket.eventId.venue.address} <br />
                {ticket.eventId.venue.city}, {ticket.eventId.venue.state} {ticket.eventId.venue.zip}
              </div>
              <div className="card-action">
                <Link className="btn-flat waves-effect" to={`event/${ticket.eventId._id}/ticket/${ticket._id}`}>View</Link>
                <Link className="btn-flat waves-effect" onClick={() => this.openTicketSellModal()}>Sell</Link>
                <Link className="btn-flat waves-effect" onClick={() => this.openTicketTransferModal()}>Transfer</Link>
                {/* <Link className="btn-flat waves-effect">History</Link> */}
              </div>
            </div>
          </div>
        </div>
        <div className="card horizontal sticky-action small hide-on-small-only">
          <div className="card-image col s12 m6">
            {(ticket.isForSale) ? <div className="ribbon"><span>For Sale</span></div> : null }
            <img src={ticket.eventId.imageUrl} />
            <span className="card-title">{ticket.eventId.name}</span>
            {/* <a className="btn-floating halfway-fab waves-effect waves-light terrapin-green"><i className="material-icons">share</i></a> */}
          </div>
          <div className="card-stacked col s12 m6">
            <div className="card-content">
              <a className="card-title">{ticket.eventId.name}</a>
              <small>{moment(ticket.eventId.date).format('dddd MMMM Do, YYYY')}</small>
              <div className="venue-info">
                {ticket.eventId.venue.name} <br />
                {ticket.eventId.venue.address} <br />
                {ticket.eventId.venue.city}, {ticket.eventId.venue.state} {ticket.eventId.venue.zip}
              </div>
            </div>
            <div className="card-action">
              <Link className="btn-flat waves-effect" to={`event/${ticket.eventId._id}/ticket/${ticket._id}`}>View</Link>
              <Link className="btn-flat waves-effect" onClick={() => this.openTicketSellModal()}>Sell</Link>
              <Link className="btn-flat waves-effect" onClick={(e) => this.openTicketTransferModal(ticket)}>Transfer</Link>
              {/* <Link className="btn-flat waves-effect">History</Link> */}
            </div>
          </div>
        </div>
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
        <TicketTransferModal
          ticket={this.props.ticket}
          closeModal={() => this.setState({transferTicketModalOpen: false})}
          isOpen={this.state.transferTicketModalOpen}
          transferTicket={this.transferTicket} />
      </div>
    );
  }
}

export default TicketRow;
