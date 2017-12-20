import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Loading from '../../../components/shared/Loading';
import Price from '../../../components/shared/Price';
import EventInfo from '../../../components/shared/EventInfo/EventInfo';

import TicketViewModal from './TicketViewModal';
import TicketTransferModal from './TicketTransferModal';

import Order from '../../../components/shared/Checkout/Order';
import Payment from '../../../components/shared/Checkout/Payment';
import Register from '../../Checkout/components/Register';

import './Ticket.scss';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceFee: 1,
      cardFee: 2
    };
    this.openTicketViewModal = this.openTicketViewModal.bind(this);
    this.openTicketTransferModal = this.openTicketTransferModal.bind(this);
  }

  componentDidMount() {
    let { serviceFee, cardFee } = this.state;
    this.props.getTicketInfo(this.props.params.ticketId);
    this.setState({ total: this.calculateTotal(serviceFee + cardFee)});
  }

  calculateTotal(fees) {
    let { event, order } = this.props;
    return (event.price * 1) + fees;
  }

  openTicketViewModal(ticket) {
    this.setState({viewTicketModalOpen: true, selectedTicket: ticket});
  }

  openTicketTransferModal(ticket) {
    this.setState({transferTicketModalOpen: true, selectedTicket: ticket});
  }

  toggleForSale() {
    this.props.toggleForSale(this.props.ticket);
  }

  isOwner() {
    let { user, ticket } = this.props;
    if (!user || user._id !== ticket.ownerId) return false;
    return true;
  }

  async onRegister(userData) {
    this.setState({ userData });
  }

  async buyTicketsWithStripe(token, order) {
    let { buyTicketsStripe } = this.props;
    await buyTicketsStripe(token, order);
    browserHistory.push(this.props.redirect);
  }

  render() {
    let { ticket, user, event } = this.props;
    let order = { _id: this.props.params.ticketId, ticketQty: 1 }
    if (!this.props.ticket._id) {
      return (
        <Loading />
      );
    }
    return (
      <div className='route-container container'>
        <div className="card sticky-action">
          <div className="card-image">
            <img src={ticket.eventId.imageUrl} />
            {/* <span className="card-title">{ticket.eventId.name}</span> */}
            <a className="btn-floating halfway-fab waves-effect waves-light terrapin-green"><i className="material-icons">share</i></a>
          </div>
          <div className="barcode-container center"  style={{display: 'block'}}>
            <img src={require('../../../layouts/assets/img/barcode.png')} /> <br />
            <span>This is the barcode that will be scanned to get you into the event.</span>
          </div>
          <div className="card-content card" style={{margin: 0, borderRadius: 0, boxShadow: 'none'}}>
            {/* <span className="card-title">Ticket Details</span> */}
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th className="hide-on-med-and-down">For Sale</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr style={{borderBottom: 0}}>
                  <td>{ticket.eventId.date}</td>
                  <td>{ticket.type} <br />
                      <small className="caption"><i>{ticket._id}</i></small></td>
                  <td><Price price={ticket.price} /></td>
                  <td className="valign-wrapper hide-on-med-and-down"><div className="switch">
                    <label>
                    <input type="checkbox"
                      checked={ticket.isForSale}
                      onChange={() => this.toggleForSale()}
                    /><span className="lever"></span>
                    </label>
                  </div>
                </td>
                  {this.isOwner() ? (
                    <td>
                      <button className="activator terrapin-green white-text btn hide-on-large-only">Actions</button>
                      <i className="material-icons activator hide-on-med-and-down" style={{cursor: 'pointer'}}>more_vert</i>
                    </td>
                  ) : (
                    <td>
                      <button className="activator terrapin-green white-text btn hide-on-large-only">Buy Now</button>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
            <div className="card-reveal center" style={{paddingBottom: 0}}>
              <span className="card-title close"><i className="material-icons right">close</i></span>
              <ul className="collection">
                <a className="collection-item card-title" style={{fontSize: 16, marginBottom: 0, lineHeight: '24px'}} onClick={() => this.toggleForSale()}>
                  <i className="material-icons">attach_money</i>{(ticket.isForSale) ? 'Unmark as For Sale' : 'Mark as For Sale'}
                </a>
                <a className="collection-item card-title" style={{fontSize: 16, marginBottom: 0, lineHeight: '24px'}}>
                  <i className="material-icons">email</i><span>Transfer via Email</span>
                </a>
                <a className="collection-item card-title" style={{fontSize: 16, marginBottom: 0, lineHeight: '24px'}}>
                  <i className="material-icons">history</i><span>View History</span>
                </a>
              </ul>
            </div>
          </div>
        </div>

        {this.isOwner() ? (null) : (
          <div className="row card checkout-information">
            <div className="card-content">
              <Order
                serviceFee={this.state.serviceFee}
                cardFee={this.state.cardFee}
                total={this.state.total}
                order={order}
                event={event}
                user={user}
                buyTicketsWithStripe={this.buyTicketsWithStripe.bind(this)}
              />

              <Payment
                order={order}
                event={event}
                user={user}
                buyTicketsWithStripe={this.buyTicketsWithStripe.bind(this)}
              />
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-content">
            <span className="card-title">
              <h2>Venue Information</h2>
            </span>
              {ticket.eventId.venue.name} <br />
              {ticket.eventId.venue.address} <br />
              {ticket.eventId.venue.city}, {ticket.eventId.venue.state} {ticket.eventId.venue.zip}
          </div>
        </div>
        <TicketViewModal
          ticket={this.state.selectedTicket}
          closeModal={() => this.setState({viewTicketModalOpen: false, selectedTicket: null })}
          isOpen={this.state.viewTicketModalOpen}
          user={user}
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
