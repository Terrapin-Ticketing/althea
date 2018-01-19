import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import classNames from 'classnames';
import Loading from '../../../components/shared/Loading';
import Price from '../../../components/shared/Price';
import EventInfo from '../../../components/shared/EventInfo/EventInfo';

import ShareModal from '../../../components/shared/ShareModal';
import TicketTransferModal from '../../../components/shared/TicketTransferModal';
import TicketSellModal from '../../../components/shared/TicketSellModal';

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
    this.openTicketTransferModal = this.openTicketTransferModal.bind(this);
    this.transferTicket = this.transferTicket.bind(this);
  }

  componentDidMount() {
    let { serviceFee, cardFee } = this.state;
    this.props.getTicketInfo(this.props.params.ticketId);
    this.setState({ total: this.calculateTotal(serviceFee + cardFee)});
    // TODO: This is broken. Fix.
    // document.title = `${this.props.ticket.eventId.name} Ticket - Terrapin Ticketing`;
  }

  calculateTotal(fees) {
    let { event, order } = this.props;
    return (event.price * 1) + fees;
  }

  openTicketShareModal(ticket) {
    this.setState({shareTicketModalOpen: true});
  }

  openTicketSellModal(ticket) {
    this.setState({sellTicketModalOpen: true, selectedTicket: ticket});
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

  async transferTicket(ticketId, recipientEmail) {
    this.setState({ isLoading: true, ticketTransfered: true, recipientEmail: recipientEmail });
    let res = await this.props.transferTicket(ticketId, recipientEmail);
    // await this.props.getTicketInfo(res.ticket._id);
    this.setState({ isLoading: false })
  }

  async buyTicketsWithStripe(token, order) {
    this.setState({ isLoading: true, error: null });
    let { buyTicketsStripe } = this.props;
    await buyTicketsStripe(token, order);
    let { error, redirect } = this.props;
    if (error) return this.setState({ error, isLoading: false });
    browserHistory.push(redirect);
  }

  render() {
    let { ticket, user, event } = this.props;
    if (!this.props.ticket._id) {
      return (
        <Loading />
      );
    }
    return (
      <div className='route-container container'>
        <div className="card sticky-action">
          <div className="card-image">
            {(ticket.isForSale) ? <div className="ribbon"><span>For Sale</span></div> : null }
            <img src={ticket.eventId.imageUrl} />
            {/* <span className="card-title">{ticket.eventId.name}</span> */}
          </div>
          { ticket.barcode && (
            <div className="barcode-container center" style={{display: 'block'}}>
              {/* CINCI TICKET CODE (needs to be abstracted) */}
              <img src={`https://terrapin.cincyregister.com/images/barcode.php?c=${ticket.barcode}&p=520a67c3&f=0&x=2&h=60&q=3&t=code128`} /> <br />
              <span><small className="caption">
                This barcode is only visible to the ticket's owner when logged in
              </small></span>
            </div>
          ) }
          <div style={{margin: 0, borderRadius: 0, boxShadow: 'none'}}>
            {/* <span className="card-title">Ticket Details</span> */}
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th className="hide-on-med-and-down">For Sale</th>
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
                </tr>
              </tbody>
            </table>
          </div>
          {(this.isOwner()) ? (
            <div className="card-action valign-wrapper">
              <i onClick={() => this.openTicketShareModal()} className="material-icons share-icon">share</i>
              <div className="action-buttons">
                <Link className="action-button btn-flat waves-effect" onClick={() => this.openTicketSellModal()}>Sell</Link>
                <Link className="action-button btn-flat waves-effect" onClick={() => this.openTicketTransferModal()}>Transfer</Link>
              </div>
            </div>
          ) : null}
        {/* </div> */}
        { this.state.error ? (
          <div className="terrapin-red lighten-1 scale-transition scale-in card-panel" style={{color: '155724' }}>{this.state.error}</div>
        ) : null }

        {(this.state.ticketTransfered) ? (
          <div className="terrapin-green lighten-1 scale-transition scale-in card-panel" style={{color: '155724' }}>
            Transfered ticket to {this.state.recipientEmail}
          </div>
        ): null }
        { ticket.isForSale && (
          <div className="row checkout-information">
            <Order order={[ticket]} />

            <Payment
              order={[ticket]}
              user={user}
              isLoading={this.state.isLoading}
              buyTicketsWithStripe={this.buyTicketsWithStripe.bind(this)}
            />
          </div>
        ) }

        <div className="card" style={{marginTop: 0}}>
          <div className="card-content">
            <span className="card-title">
              <h2>Venue Information</h2>
            </span>
              {ticket.eventId.venue.name} <br />
              {ticket.eventId.venue.address} <br />
              {ticket.eventId.venue.city}, {ticket.eventId.venue.state} {ticket.eventId.venue.zip}
          </div>
        </div>
        <ShareModal
          ticket={this.props.ticket}
          closeModal={() => this.setState({shareTicketModalOpen: false})}
          isOpen={this.state.shareTicketModalOpen} />
        {(this.isOwner()) ? (
          <TicketTransferModal
            ticket={this.props.ticket}
            closeModal={() => this.setState({transferTicketModalOpen: false, selectedTicket: null })}
            isOpen={this.state.transferTicketModalOpen}
            transferTicket={this.transferTicket} />
          ) : null }
        {(this.isOwner()) ? (
          <TicketSellModal
            ticket={this.props.ticket}
            user={this.props.user}
            closeModal={() => this.setState({sellTicketModalOpen: false, selectedTicket: null })}
            isOpen={this.state.sellTicketModalOpen}
            sellTicket={this.props.sellTicket} />
          ) : null }
      </div>
    </div>
    );
  }
}

export default Ticket;
