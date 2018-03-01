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
      // serviceFee: 1,
      // cardFee: 2
    };
    this.openTicketTransferModal = this.openTicketTransferModal.bind(this);
    this.transferTicket = this.transferTicket.bind(this);
  }

  async componentDidMount() {
    // let { serviceFee, cardFee } = this.state;
    await this.props.getTicketInfo(this.props.params.ticketId);
    await this.props.getEventInfo(this.props.params.eventId);
    this.setState({ ticket: this.props.ticket });
    // this.setState({ total: this.calculateTotal(serviceFee + cardFee)});
    // TODO: This is broken. Fix.
    document.title = `${this.props.ticket.eventId.name} Ticket - Terrapin Ticketing`;
  }

  calculateTotal(fees) {
    // let { event, order } = this.props;
    // return (event.price * 1) + fees;
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
    let { ticketTransfered } = this.state;
    if (!user || user._id !== ticket.ownerId || ticketTransfered) return false;
    return true;
  }

  async onRegister(userData) {
    this.setState({ userData });
  }

  async transferTicket(ticketId, recipientEmail) {
    this.setState({ isLoading: true, ticketTransfered: true, recipientEmail: recipientEmail });
    await this.props.transferTicket(ticketId, recipientEmail);
    let ticket = await this.props.getTicketInfo(ticketId);
    this.setState({ ticket, isLoading: false });
  }

  async buyTicketsWithStripe(token, order, transferToUser) {
    this.setState({ isLoading: true, error: null });
    let { buyTicketsStripe } = this.props;
    await buyTicketsStripe(token, order, transferToUser);
    let { error, redirect } = this.props;
    if (error) return this.setState({ isLoading: false });
    browserHistory.push(redirect);
  }

  renderError(error) {
    return error && <div className="terrapin-red alert lighten-1 scale-transition scale-in" style={{color: '155724' }}>{error}</div>;
  }

  render() {
    let { user, event } = this.props;
    let ticket = this.state.ticket;
    if (!ticket || !ticket._id || !ticket.eventId.venue) {
      return (
        <Loading />
      );
    }
    return (
      <div className='route-container container'>
        { ((ticket.isForSale) && (ticket.ownerId !== (user && user._id))) && (
          <div className="card terrapin-green alert scale-transition scale-in valign-wrapper" style={{color: '#f8f8f8'}}>
              <i className='material-icons' style={{padding: '5px 10px'}}>attach_money</i> <span>This ticket is for sale <br />
              <small><i>Fill out your payment informaiton below to purchase it</i></small>
            </span>
          </div>
        )}
        { ((ticket.isForSale) && (ticket.ownerId === (user && user._id))) && (
            <div className="card terrapin-orange alert scale-transition scale-in valign-wrapper" style={{color: '#f8f8f8'}}>
                <i className='material-icons' style={{padding: '5px 10px'}}>attach_money</i> <span>Your ticket is for sale <br />
                <small><i>Someone may purchase it, preventing it's usage to gain entry to the event</i></small>
              </span>
            </div>
        )}
        <div className="card sticky-action">
          <div className="card-image">
            {(ticket.isForSale) ? <div className="ribbon"><span>For Sale</span></div> : null }
            <img src={ticket.eventId.thumbnail_image_url} />
            {/* <span className="card-title">{ticket.eventId.name}</span> */}
          </div>
          { ticket.barcode && !ticket.isForSale && (
            <div className="barcode-container center" style={{display: 'block'}}>
              <img width="150px" src={`https://terrapin.cincyregister.com/images/barcode.php?c=${ticket.barcode}&p=520a67c3&f=0&x=2&h=60&q=3&t=qrcode`} /> <br />
              <span><small className="caption">
                This barcode is only visible to the ticket's owner when logged in
              </small></span>
            </div>
          ) }
          <div style={{margin: 0, borderRadius: 0, boxShadow: 'none'}}>
            <table className="responsive-table">
              <thead>
                <tr>
                  {/* <th>Date</th> */}
                  <th>Type</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{borderBottom: 0}}>
                  {/* <td>{ticket.eventId.date}</td> */}
                  <td>{ticket.type}</td>
                  <td><Price price={ticket.price} /></td>
                </tr>
              </tbody>
            </table>
          </div>
          {(this.state.ticketTransfered) ? (
            <div className="terrapin-green lighten-1 scale-transition alert scale-in" style={{color: '155724' }}>
              Transfered ticket to {this.state.recipientEmail.email}
            </div>
          ): null }
            {(this.isOwner()) ? (
            <div className="card-action valign-wrapper">
              <i onClick={() => this.openTicketShareModal()} className="material-icons share-icon">share</i>
              <div className="action-buttons">
                <Link className="action-button btn-flat waves-effect" onClick={() => this.openTicketSellModal()}>Sell</Link>
                <Link className="action-button btn-flat waves-effect" onClick={() => this.openTicketTransferModal()}>Transfer</Link>
              </div>
            </div>
          ) : null }
        { ticket.isForSale ? (
          <div className="row checkout-information">
            <Order
              order={[ticket]}
              serviceFee={event.totalMarkupPercent * ticket.price}
            />

            <Payment
              order={[ticket]}
              user={user}
              error={this.props.error}
              isLoading={this.state.isLoading}
              buyTicketsWithStripe={this.buyTicketsWithStripe.bind(this)}
            />
          </div>
        ) : this.renderError(this.props.error) }

      <div className="venue-information">
        <h2>Venue Information</h2>
        {ticket.eventId.venue.name} <br />
        {ticket.eventId.venue.address} <br />
        {ticket.eventId.venue.city}, {ticket.eventId.venue.state} {ticket.eventId.venue.zip}
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
