import React, { Component } from 'react';
import { Link } from 'react-router';
import Loading from '../../../components/shared/Loading';
import Price from '../../../components/shared/Price';
import EventInfo from '../../../components/shared/EventInfo.js';
import TicketViewModal from './TicketViewModal';
import TicketTransferModal from './TicketTransferModal';

import './Ticket.scss';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openTicketViewModal = this.openTicketViewModal.bind(this);
    this.openTicketTransferModal = this.openTicketTransferModal.bind(this);
  }

  componentDidMount() {
    this.props.getTicketInfo(this.props.params.ticketAddress);
    this.props.getEventInfo(this.props.params.eventAddress);
    this.props.getEventAuxInfo(this.props.params.eventAddress);
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
          <Price price={usdPrice} />
        </span>
        <span>{(isRedeemed) ? 'Redeemed' : 'Not Redeemed'}</span>
        <span>{(isForSale) ? 'For Sale' : 'Not For Sale' } <br />
          {/* <div className="switch-container">
            <input type="checkbox" id="id-name--1" name="set-name" className="switch-input" />
            <label for="id-name--1" className="switch-label">Switch <span className="toggle--on">On</span><span className="toggle--off">Off</span></label>
          </div> */}
        </span>
      </div>
    );
  }

  openTicketViewModal(ticket) {
    this.setState({viewTicketModalOpen: true, selectedTicket: ticket});
  }

  openTicketTransferModal(ticket) {
    this.setState({transferTicketModalOpen: true, selectedTicket: ticket});
  }

  render() {
    if (!this.props.ticket) {
      return (
        <Loading />
      );
    }
    return (
      <div className='route-container'>
        <EventInfo event={this.props.event} />
        <div className="card">
          <h2>Ticket Details</h2>
          <div className="ticket-details-header">
            <span className="ticket-type">Ticket Type</span>
            <span>Price</span>
            <span>Is Redeemed</span>
            <span>Is For Sale</span>
          </div>
          {this.renderTicketInfo()}
        </div>
        <div className="card">
          <h2>Ticket Actions</h2>
          <button name="action-button" onClick={() => this.openTicketViewModal(this.props.ticket)}>View Barcode</button>
          <button name="action-button" onClick={() => this.sellTicket(this.props.ticket)}>Sell Ticket</button>
          <button name="action-button" onClick={() => this.openTicketTransferModal(this.props.ticket)}>Transfer</button>
          <button name="action-button">View History</button>
        </div>
        <TicketViewModal
          ticket={this.state.selectedTicket}
          closeModal={() => this.setState({viewTicketModalOpen: false, selectedTicket: null })}
          isOpen={this.state.viewTicketModalOpen}
          user={this.props.user}
          />

        <TicketTransferModal
          ticket={this.state.selectedTicket}
          closeModal={() => this.setState({transferTicketModalOpen: false, selectedTicket: null })}
          isOpen={this.state.transferTicketModalOpen}
          transferTicket={this.props.transferTicket} />
      </div>
    );
  }
}

export default Ticket;
