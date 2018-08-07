import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import QRCode from 'qrcode.react';

import Loading from '../../../components/shared/Loading';
import Price from '../../../components/shared/Price';

import ShareModal from '../../../components/shared/ShareModal';
import TransferTicketModal from '../../../components/shared/TransferTicketModal';
import SellTicketModal from '../../../components/shared/SellTicketModal';
import LoginForm from '../../../components/forms/LoginForm';
import Order from '../../../components/shared/Checkout/Order';
import Payment from '../../../components/shared/Checkout/Payment';

import './Ticket.scss';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // serviceFee: 1,
      // cardFee: 2
    };
    this.openTransferTicketModal = this.openTransferTicketModal.bind(this);
    this._beforeUnload = this._beforeUnload.bind(this);
  }

  _beforeUnload(ev) {
    ev.preventDefault();
    const { ticketId } = this.props.params;
    // remove reserve token from backend
    this.props.deleteReserveToken(ticketId);
    // return ev.returnValue = 'If you leave you will loose your claim to this ticket';
    return null;
  }

  async componentDidMount() {
    const { ticketId, eventId } = this.props.params;
    await this.props.getReserveToken(ticketId);
    await this.props.getTicketInfo(ticketId);
    await this.props.getEventInfo(eventId);
    document.title = `${this.props.ticket.event.name} Ticket - Terrapin Ticketing`;

    if (this.props.reserveToken) {
      let remove = this.props.router.setRouteLeaveHook(this.props.route, () => {
        remove();
        if (this.state.isBuying) return;
        return 'If you leave you will loose your claim to this ticket';
      });
    }

    window.addEventListener('beforeunload', this._beforeUnload);
  }

  componentWillUnmount() {
    const { ticketId } = this.props.params;
    // remove reserve token from backend
    this.props.deleteReserveToken(ticketId);
    window.removeEventListener('beforeunload', this._beforeUnload);
  }

  openTicketShareModal(ticket) {
    this.setState({shareTicketModalOpen: true});
  }

  openSellTicketModal(ticket) {
    this.props.openSellTicketModal(ticket);
  }

  openTransferTicketModal(ticket) {
    this.props.openTransferTicketModal(ticket);
  }

  isOwner() {
    let { user, ticket } = this.props;
    let { ticketTransfered } = this.state;
    if (!user || user._id !== ticket.ownerId || ticketTransfered) return false;
    return true;
  }

  async buyTicketsWithStripe(token, order, transferToUser) {
    this.setState({ isLoading: true, error: null });
    let { buyTicketsStripe } = this.props;
    await buyTicketsStripe(token, order, transferToUser);
    let { error, redirect } = this.props;
    if (error) return this.setState({ isLoading: false });
    this.setState({ isBuying: true });
    browserHistory.push(redirect);
  }

  renderError(error) {
    return error && <div className="terrapin-red alert lighten-1 scale-transition scale-in" style={{color: '155724' }}>{error}</div>;
  }

  render() {
    let { user, event, ticket, reserveToken } = this.props;
    if (!ticket || !ticket._id || !ticket.event.venue) {
      return (
        <Loading />
      );
    }

    const isOwner = (ticket.ownerId === (user && user._id));

    if (!ticket.isForSale && !isOwner) {
      return (
        <div className="card">
          <div className="card-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignSelf: 'center'}}>
            You are attempting to view a ticket that is not for sale. If you are the owner of this ticket, login below to view it.
            <LoginForm />
          </div>
        </div>
      );
    }

    if (!reserveToken && !isOwner) {
      return (
        <div className="card">
          <div className="card-content" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignSelf: 'center'}}>
            The ticket you are attempting to view is currently being purchased by another fan. <br />
            <Link to={`/event/${ticket.event.urlSafe}/tickets`}> <button class="waves-effect waves-light btn-large terrapin-green">View Other Available Tickets</button></Link>
          </div>
        </div>
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
            <img src={ticket.event.imageUrl} />
            {/* <span className="card-title">{ticket.event.name}</span> */}
          </div>
          { ticket.barcode && !ticket.isForSale && (
            <div className="barcode-container center" style={{display: 'block'}}>
              { ticket.event.ticketRenderMethod === 'QR' ? (
                <QRCode value={ticket.barcode} size="300" />
              ): (
                <img width="170px" src={`https://terrapin.cincyregister.com/images/barcode.php?c=${ticket.barcode}&p=520a67c3&f=0&x=2&h=60&q=3&t=qrcode`} />
              )}
              <br />
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
                  {/* <td>{ticket.event.date}</td> */}
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
                <Link className="action-button btn-flat waves-effect" onClick={() => this.openSellTicketModal(ticket)}>Sell</Link>
                <Link className="action-button btn-flat waves-effect" onClick={() => this.openTransferTicketModal(ticket)}>Transfer</Link>
              </div>
            </div>
          ) : null }
        { ticket.isForSale ? (
          <div className="row checkout-information">
            <Order
              order={[ticket]}
              serviceFee={event.totalMarkupPercent * ticket.price + event.totalStaticMarkup}
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
        {ticket.event.venue.name} <br />
        {ticket.event.venue.address} <br />
        {ticket.event.venue.city}, {ticket.event.venue.state} {ticket.event.venue.zip}
      </div>
      <ShareModal
        ticket={this.props.ticket}
        closeModal={() => this.setState({shareTicketModalOpen: false})}
        isOpen={this.state.shareTicketModalOpen} />
      {(this.isOwner()) ? (
        <TransferTicketModal
          ticket={this.props.ticket}
          isOpen={this.props.transferTicketModalOpen}
        />
        ) : null }
      {(this.isOwner()) ? (
        <SellTicketModal
          ticket={this.props.ticket}
          isOpen={this.props.sellTicketModalOpen} />
        ) : null }
      </div>
    </div>
    );
  }
}

export default Ticket;
