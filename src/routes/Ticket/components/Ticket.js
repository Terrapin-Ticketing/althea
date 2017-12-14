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
    this.props.getTicketInfo(this.props.params.ticketId);
    this.props.getEventInfo(this.props.params.eventId);
    $('.collapsible').collapsible();
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
      <div className='route-container container'>
        <EventInfo event={this.props.event} />

        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div className="collapsible-header"><i className="material-icons">pageview</i>Click to View Barcode</div>
            <div className="collapsible-body center">
              <img src={require('../../../layouts/assets/img/barcode.png')} /> <br />
              <span>This is the barcode that will be scanned to get you into the event.</span>
            </div>
          </li>
        </ul>

        <div className="card">
            <div className="card-content">
            <span className="card-title"><h2>Ticket Details</h2></span>
            <div className="ticket-details-header">
              <span className="ticket-type">Ticket Type</span>
              <span>Price</span>
              <span>Is Redeemed</span>
              <span>Is For Sale</span>
            </div>
            {this.renderTicketInfo()}
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <span className="card-title"><h2>Ticket Actions</h2></span>

            <ul className="collection">
              <a className="collection-item"><i className="material-icons">event_seat</i><span>View Barcode</span></a>
              <a className="collection-item"><i className="material-icons">link</i><span>Permalink</span></a>
              <a className="collection-item"><i className="material-icons">attach_money</i><span>Mark as For Sale</span></a>
              <a className="collection-item"><i className="material-icons">payment</i><span>Mark as For Sale</span></a>
              <a className="collection-item"><i className="material-icons">email</i><span>Transfer via Email</span></a>
              <a className="collection-item disabled"><i className="material-icons">history</i><span>View History</span></a>
            </ul>
          </div>
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
